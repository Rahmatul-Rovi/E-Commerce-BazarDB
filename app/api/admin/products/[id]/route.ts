import { auth } from "@/auth";
import { NextResponse } from "next/server";

async function checkAdmin() {
    const session = await auth();
    return session?.user?.role === "admin" ? session : null;
}

export async function PATCH(
    request: Request,
    {params}: {params: Promise<{id: string}>}
){
    const session = await checkAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const {id} = await params;
    const body = await request.json();
    const { name, slug, price, discount, imageUrl, stock, categoryId } = body;
}