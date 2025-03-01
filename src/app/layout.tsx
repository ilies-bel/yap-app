import React from "react";

import './global.css'
import './index.css'
import WithAuth from "@/lib/auth/WithAuth";
import QueryProvider from "@/lib/QueryClientProvider";

export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }) {
    return (
        <html lang="fr">
        <head>
            <title>Yet another planner</title>
        </head>
        <body>
        <div id="root">
            <WithAuth>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </WithAuth>
        </div>
        </body>
        </html>
    )
}