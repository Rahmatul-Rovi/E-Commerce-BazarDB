import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function checkAdmin() {
  const session = await auth();
  return session?.user?.role === "admin" ? session : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const { name, slug, price, discount, imageUrl, stock, categoryId } = body;

  try {
    const product = await prisma.product.update({
      where: { id },
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
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}