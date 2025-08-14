'use client'
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            throwOnError: true,
        },
        mutations: {
            retry: false,
            throwOnError: true,
        }
    },
    queryCache: new QueryCache({
        onError: async (error: Error) => {
            console.error('error', error)
        },
    }),
});

export default function QueryProvider({children}: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}