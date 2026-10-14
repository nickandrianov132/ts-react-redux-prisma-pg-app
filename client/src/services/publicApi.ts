import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = `${import.meta.env.VITE_API_URL}api`;

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl
})

export const publicApi = createApi({
    reducerPath: 'publicApi',
    baseQuery: baseQuery,
    endpoints: () => ({})
})