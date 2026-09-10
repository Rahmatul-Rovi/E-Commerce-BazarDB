import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    include: { category: true },
    take: 20,
  });

  return NextResponse.json(products);
}