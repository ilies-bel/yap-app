import React from "react";

import './global.css'
import './index.css'
import WithAuth from "@/lib/auth/WithAuth";

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
                {children}
            </WithAuth>
        </div>
        </body>
        </html>
    )
}