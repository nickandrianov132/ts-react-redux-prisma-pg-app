import type { RegistrationFormData } from "../utils/regSchema";
import { publicApi } from "./publicApi";

interface IRegistrationResponse {
    success: boolean;
    message?: string;
    token?: string;
}


export const registrationApi = publicApi.injectEndpoints({
    endpoints: (build) => ({
        registerUser: build.mutation<IRegistrationResponse, RegistrationFormData>({
            query: (regData) => ({
                url: `/user/registration`,
                method: 'POST',
                body: regData
            })

        })
    })
})

export const { useRegisterUserMutation } = registrationApi;