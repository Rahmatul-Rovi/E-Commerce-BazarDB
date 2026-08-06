import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const session = await auth();

    if(!session?.user?.id){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}