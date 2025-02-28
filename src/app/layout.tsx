import React from "react";

import './global.css'
import './index.css'

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
        <div id="root">{children}</div>
        </body>
        </html>
    )
}