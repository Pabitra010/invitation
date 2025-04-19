"use server";

import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";


export default async function SignIn(prevState: { error: string } | null, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    console.log("data", data);
    if (error) {
        return { error: error.message }
    }
    redirect("/admin/rsvps")
}

export async function SignOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: error.message }
    }
    redirect("/login")
}
