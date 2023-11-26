"use client";
import axios from 'axios';
import React from "react";
import {QueryClient, QueryClientProvider} from 'react-query'
import {useRouter} from "next/navigation";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true
});

const QueryProvider = ({children}: {
    children: React.ReactNode
}) => {
    const { push } = useRouter();
    api.interceptors.response.use(
        response => response,
        async error => {
            if (error.response.status === 403) {
                const { config } = error;
                const response = await api.get('/refresh');
                const newToken = response.data.accessToken;
                localStorage.setItem('accessToken', newToken)
                config.headers.Authorization = `Bearer ${newToken}`
                return api(config);
            }
            if (error.response.status === 401) {
                push('/login')
                return;
            }
            return Promise.reject(error);
        },
    );
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    }));
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

export default QueryProvider;
