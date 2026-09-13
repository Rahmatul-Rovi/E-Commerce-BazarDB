import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: {productId},
    include: { user: { select: { name: true, image: true } } },
    orderBy: { createdAt: "desc" },
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({ reviews, avgRating, count: reviews.length });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in to write a review" }, { status: 401 });
  }

  const { productId, rating, comment } = await request.json();

   if (!productId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid review data" }, { status: 400 });
  }

  try {
    const review = await prisma.review.upsert({
      where: {
        productId_userId: {
          productId,
          userId: session.user.id,
        },
      },
      update: { rating, comment },
      create: {
        productId,
        userId: session.user.id,
        rating,
        comment,
      },
    });