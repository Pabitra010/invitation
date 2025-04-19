"use server";

import { createClient } from "../utils/supabase/server";

export async function getRSVPS() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("rsvp").select("*");
     
  console.log(data,"data");;
  
  if (error) {
    console.error("Error fetching RSVPs:", error);
    return {succsses: false, message: "faild to fetch RSVPs"};
  }

  return {success: true, data};
}