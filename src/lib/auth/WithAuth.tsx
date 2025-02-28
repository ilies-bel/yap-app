import React, {ReactNode} from "react";
import {AuthProvider} from "@/lib/auth/AuthContext";

export default function WithAuth({children}: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}