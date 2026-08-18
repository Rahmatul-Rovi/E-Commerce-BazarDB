import { auth } from "@/auth";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const session = await auth();
    if(session?.user?.role !== "admin"){
        return NextResponse.json({error: "Forbidded"}, {status:403});
    }
}