"use client"

import {SignInForm} from '@/components/auth/SignInForm.tsx';
import {useAuth} from '@/context/AuthContext.tsx';
import {useEffect} from 'react';
import {useRouter} from "next/navigation";

export default function SignInPage() {
    const {user, loading} = useAuth();

    const router = useRouter(); // Use the hook instead of direct import

    useEffect(() => {
        // Redirect if user is already logged in
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading]);

    // Show loading state or render the form
    if (loading || user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
                <SignInForm/>
            </div>
        </div>
    );
}