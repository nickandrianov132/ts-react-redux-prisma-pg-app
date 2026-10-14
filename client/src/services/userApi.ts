import { api } from "./api";


export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (user) => ({
                url: `/user/login`,
                method: 'POST',
                body: user
            }),
        }),
        userLogout: build.mutation<void, void>({
            query: () => ({
                url: `/user/logout`,
                method: 'POST',
            })
        })
    })
});

export const { useUserLoginMutation, useUserLogoutMutation } = userApi;