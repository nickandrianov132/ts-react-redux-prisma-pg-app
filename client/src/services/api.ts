import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "../store/slices/authSlice";
import { type RootState } from "../store/store";


const baseUrl = `${import.meta.env.VITE_API_URL}api`;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        // console.log(getState())
        const state = getState() as RootState;
        const token = state.user.accessToken
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers;
    },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    // 1. Делаем обычный запрос
    let result = await baseQuery(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
        api.dispatch(logout());
        return result;
    }

    if (result.data) {
        // Типизируем result.data как объект, чтобы TS не ругался на проверку свойства
        const data = result.data as { token?: string };
        
        if (data.token !== undefined) {
            api.dispatch(setToken(data.token));
            result = await baseQuery(args, api, extraOptions);
        }
    }
    
    return result;
};

export const api = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: [ "authToken" ],
    endpoints: () => ({})
})
