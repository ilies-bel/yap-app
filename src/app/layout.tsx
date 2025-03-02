import React from "react";

import './global.css'
import WithAuth from "@/lib/auth/WithAuth";
import QueryProvider from "@/lib/QueryClientProvider";
import {ThemeProvider} from "@/components/theme-provider";
import ErrorBoundary from "../lib/errorBoundary";

export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <head>
            <title>Yet another planner</title>
        </head>
        <body>
        <div id="root">
            <WithAuth>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ErrorBoundary>
                            {children}
                        </ErrorBoundary>
                    </ThemeProvider>
                </QueryProvider>
            </WithAuth>
        </div>
        </body>
        </html>
    )
}