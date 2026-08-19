import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    {params} : {params : Promise<{id: string}>}
) {
    const session = await auth();
    if(session?.user?.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
}