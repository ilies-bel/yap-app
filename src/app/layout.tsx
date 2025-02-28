import React from "react";

import './global.css'
import './index.css'
import {AuthProvider} from "@/context/AuthContext.tsx";

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
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
        </body>
        </html>
    )
}