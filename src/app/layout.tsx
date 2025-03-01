import React from "react";

import './global.css'
import WithAuth from "@/lib/auth/WithAuth";
import QueryProvider from "@/lib/QueryClientProvider";
import {ThemeProvider} from "@/components/theme-provider";

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
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </WithAuth>
        </div>
        </body>
        </html>
    )
}