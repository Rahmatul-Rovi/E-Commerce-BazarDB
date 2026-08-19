import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, slug } = await request.json();

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({ data: { name, slug } });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }
}