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

export async function POST(request: Request) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { name, slug, price, discount, imageUrl, stock, categoryId } = body;

  if (!name || !slug || !price || !imageUrl || !categoryId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  
 try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : null,
        imageUrl,
        stock: parseInt(stock) || 0,
        categoryId,
      },
    });