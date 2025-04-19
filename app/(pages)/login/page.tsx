"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import  SignIn from "@/app/actions/auth";
import { useActionState } from "react";


async function signInFunctiuon( prevState: {error: string} | null, formData: FormData) {
    return await SignIn(prevState,formData);
}

export default function LoginPage() {
    const [state,formAction] = useActionState(signInFunctiuon,null);
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form action={formAction} className="p-8 bg-white rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="p-2">Email</Label>
                        <Input id="email" type="email" name="email" required />
                    </div>
                    <div>
                        <Label htmlFor="password" className="p-2">Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    <Button type="submit" className="w-full cursor-pointer">Log In</Button>
                </div>
            </form>
        </div>
    )
}