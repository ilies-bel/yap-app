"use client"
import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {authService} from "@/lib/auth/authService";
import {AuthContext, User} from "@/lib/auth/AuthContext";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            if (authService.isAuthenticated()) {
                setUser({isLoggedIn: true});
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username: string, password: string) => {
        const data = await authService.login(username, password);
        setUser({isLoggedIn: true});
        return data;
    };

    const register = async (username: string, password: string) => {
        return await authService.register(username, password);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        router.push('/auth/sign-in');
    };

    return (
        <AuthContext.Provider value={{user, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

