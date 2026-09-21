import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

   const statusMessages: Record<string, string> = {
    pending: "is pending confirmation",
    processing: "is now being processed",
    delivered: "has been delivered",
    cancelled: "has been cancelled",
  };

  return NextResponse.json(order);
}