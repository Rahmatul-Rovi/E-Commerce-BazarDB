import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if(!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized"}, {status: 401});
    }
     const orders = await prisma.order.findMany({
        where: {userId: session.user.id},
        include:{
            items: {
                include: {product: true},
            },
        },
        orderBy: {createdAt: "desc"},
     });

     return NextResponse.json(orders);

}