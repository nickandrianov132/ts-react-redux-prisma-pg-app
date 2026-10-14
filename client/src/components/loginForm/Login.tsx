import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../services/userApi";
import { loginSchema, type LoginFormData } from "../../utils/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BaseSyntheticEvent } from "react";
import type { ILoginBtnProps } from "./LoginBtn";
import { useAppDispatch } from "../../store/hooks/hooks";
import { setToken } from "../../store/slices/authSlice";

const Login = ( {setIsLogin}: ILoginBtnProps ) => {
    const [login, { isLoading }] = useUserLoginMutation();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: LoginFormData, e?: BaseSyntheticEvent) => {
        try {
            console.log("Valid Form Data:", data);
            const response = await login(data).unwrap();
            if (response.accessToken) {
                dispatch(setToken(response.accessToken));
            }
            reset({
                email: "",
                password: ""
            })
            e?.target.reset();
            setIsLogin(false);
        } catch (error) {
            console.error("Server login error:", error);
        }
    }

    return (
        <div 
            className="absolute flex items-center justify-center w-dvw h-dvh bg-slate-700/60"
        >
            <form 
                className="flex flex-col items-center gap-3 w-80 bg-slate-800 p-5 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label className="text-slate-200 mr-2" htmlFor="email">Email:</label>
                    <input
                        id="email"
                        {...register("email")}
                        type="text"
                    />
                    {errors.email && <p className="text-rose-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="text-slate-200 mr-2" htmlFor="password">Password:</label>
                    <input
                        id="password"
                        {...register("password")}
                        type="password"
                    />
                    {errors.password && <p className="text-rose-500">{errors.password.message}</p>}
                </div>
                <button
                    className="w-fit px-5 py-1 rounded-md border border-emerald-300/50 text-slate-200 bg-emerald-500/90 hover:bg-emerald-500 hover:border-slate-200/30 hover:text-white"
                    type="submit"
                    disabled={isSubmitting || isLoading}
                >
                    {isSubmitting || isLoading ? "Sending..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
