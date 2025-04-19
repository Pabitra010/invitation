import { getRSVPS } from "@/app/actions/getRSVPS";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import  RSVPTable  from "@/app/_components/RSVPTable";
import { SignOut } from "@/app/actions/auth";

export default async function RSVPSPage() {
    const { success, data, message } = await getRSVPS();
    if(!success){
        return <div className="container mx-auto mt-8 p-4">Error: {message} </div>
    }

    return (
        <div className="conntainer mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">ALL RSVPs</h1>
                <div className="flex items-center gap-2">
                    <Link href={"/"}>
                        <Button variant={"outline"}><House /></Button>
                    </Link>
                    {/* Log Out Button */}
                    <Button onClick={SignOut} variant={"outline"}>Sign Out</Button>
                </div>
            </div>
            {/* {Table} */}
            <RSVPTable data={data || []} />
        </div>
    )
}