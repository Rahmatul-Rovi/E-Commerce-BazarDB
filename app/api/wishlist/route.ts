
export default function GET() {
    const session = await auth();
     if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

   const wishlist = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

   return NextResponse.json(wishlist);
}