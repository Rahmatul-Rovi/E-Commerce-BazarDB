import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const session = await auth();
    if(session?.user?.role !== "admin"){
        return NextResponse.json({error: "Forbidded"}, {status:403});
    }

    const {name , slug} = await request.json();

    if(!name || !slug) {
        return NextResponse.json({error: "Name and Slug Required"}, {status:400});
    }
}