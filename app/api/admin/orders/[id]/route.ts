import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){
    const session = await auth();
    if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const {id} = await params;
  const {status} = await request.json();

  const order = await prisma.order.update({
    where: {id},
    data: {status},
  });
}