import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function checkAdmin() {
    const session = await auth();
    return session?.user?.role === "admin" ? session : null;
}

export async function GET() {
    const products = await prisma.product.findMany({
        include: { category: true },
    orderBy: { name: "asc" },
    });
    return NextResponse.json(products);
}