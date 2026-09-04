import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth();
    if(session?.user?.role !== "admin"){
        return NextResponse.json({error: "Forbidden"}, {status: 403});
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
     orderBy: { createdAt: "desc" },
    })
}