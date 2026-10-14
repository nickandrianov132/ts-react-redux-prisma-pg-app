import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { regSchema, type RegistrationFormData } from "../../utils/regSchema";
import type { BaseSyntheticEvent } from "react";
import { useRegisterUserMutation } from "../../services/registrationApi";


const RegForm = () => {
    const [regMutation, {error, data, isLoading, isSuccess, isError, reset: resetMutation}] = useRegisterUserMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(regSchema),
        mode: "onTouched",          
        reValidateMode: "onChange",
        defaultValues: {
            username: '',
            password: '',
            email: ''
        }
    });
    const getErrorMessage = () => {
        if (!error) return null;

        // Если это ошибка от fetchBaseQuery (сетевая или от бэкенда)
        if ('status' in error) {
            const serverData = error.data as { error?: string; message?: string } | undefined;
            return serverData?.error || serverData?.message || `Ошибка сервера: ${error.status}`;
        }

        // Если это системная или сериализованная ошибка JS
        return error.message || 'Что-то пошло не так';
    };

    const onSubmit = async (data: RegistrationFormData, e?: BaseSyntheticEvent) => {
        try {
            console.log("Valid Form Data:", data);
            // API fake call
            // await new Promise((resolve) => setTimeout(resolve, 1000)); 
            await regMutation(data).unwrap();
            reset({
                username: '',
                password: '',
                email: ''
            });

            e?.target.reset();

        } catch (error) {
            console.error("Server registration error:", error);
        }
    };

    return (
        <div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="relative flex flex-col gap-2 w-80 mt-7 ml-10"
            >
                {isError && 
                    <div className="absolute flex flex-col bg-slate-900/90 items-center justify-center px-4 py-2 h-40 w-fit border border-slate-400/50 m-5 rounded-md max-w-100">
                        <p className="text-red-500 mb-4 text-sm font-semibold">{getErrorMessage()}</p>
                        <button
                            type="button"
                            onClick={resetMutation}
                            className="w-fit text-slate-200 border border-red-500/50 rounded-md px-7 py-1 bg-rose-500 hover:bg-rose-500/90 hover:text-white hover:shadow-2xl hover:shadow-rose-600"
                        >Ok</button>
                    </div>            
                }
                {isSuccess && data && 
                    <div className="absolute flex flex-col bg-slate-900/90 items-center justify-center px-4 py-2 h-40 w-fit border border-slate-400/50 m-5 rounded-md max-w-100">
                        <p className="text-emerald-400 mb-4 text-sm font-semibold">{data.message || "Success!"}</p>
                        <button
                            type="button"
                            onClick={resetMutation}
                            className="w-fit text-slate-200 border border-slate-300/50 rounded-md px-7 py-1 bg-emerald-500 hover:bg-emerald-500/90 hover:text-white hover:shadow-2xl hover:shadow-emerald-600"
                        >Ok</button>
                    </div>            
                }
                <div className="flex flex-col">
                    <label className="block" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="input"
                        id="name"
                        {...register("username")}
                        type="text"
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="block" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="input"
                        id="password"
                        {...register("password")}
                        type="password"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="input"
                        id="email"
                        {...register("email")}
                        type="email"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <button 
                    className="w-fit border text-slate-100 border-slate-400/50 rounded-sm px-3 py-1 bg-blue-600 hover:bg-blue-600/90"
                    type="submit"
                    disabled={isSubmitting || isLoading}    
                >
                    {isSubmitting || isLoading ? "Sending..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegForm;
