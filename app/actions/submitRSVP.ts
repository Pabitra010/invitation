"use server";

import { strings } from "../utils/strings";
import { createClient } from "../utils/supabase/server";
import { Resend } from "resend";

export async function submitRSVP(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const accompany = formData.get("accompany") as string;
    const attendance = formData.get("attendance") as string;


    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await supabase.from("rsvp").insert([{
        name,
        email,
        accompany,
        attendance,
    }]);

    console.log(data, 'data_submitRSVP');

    if (error) {
        console.error("Error inserting data:", error);
        return { success: false, message: "Error inserting data" ,errors: error};
    }

    if(!strings.sendToEmail){
        console.error("No email address provided");
        return { success: false, message: "No email address provided" };
        
    }

    try {
        await resend.emails.send({
            from: 'RSVP <onboarding@resend.dev>',
            to: strings.sendToEmail,
            subject: 'New RSVP Submission',
            html: `
            <h1>New RSVP Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Number of Guests:</strong> ${accompany}</p>
            <p><strong>Attendance:</strong> ${attendance}</p>
            `
        })
    } catch (error) {
        console.error("Error sending email:", error);

    }

    return { success: true, message: "data was succesfully submitted" }

}