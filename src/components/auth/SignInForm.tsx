import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/lib/auth/UseAuth";
import {deviceService} from "@/services/device/deviceService";

const formSchema = z.object({
    username: z.string().min(1, {message: "Username is required"}),
    password: z.string().min(1, {message: "Password is required"}),
});
type FormType = z.infer<typeof formSchema>;


export function SignInForm() {
    const {login} = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();
    const isRegistered = searchParams.get('registered');

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const onSubmit = async (values: FormType) => {
        setIsLoading(true);
        setError('');

        try {
            await login(values.username, values.password);
            router.push('/'); // Redirect to dashboard after login

            deviceService.generateDeviceId()
        } catch (error) {
            // @ts-expect-error dkdkdk
            setError(error.message || 'Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 w-full max-w-md">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-gray-500">Enter your credentials to sign in</p>
            </div>

            {isRegistered && (
                <Alert>
                    <AlertDescription>
                        Account created successfully! Please sign in.
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>

                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </Form>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/auth/sign-up"
                          className="text-primary underline underline-offset-4 hover:text-primary/90">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}