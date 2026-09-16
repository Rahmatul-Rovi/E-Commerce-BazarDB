
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

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please log in to save items" }, { status: 401 });
  }

  const { productId } = await request.json();

  const existing = await prisma.wishlist.findUnique({
    where: { productId_userId: { productId, userId: session.user.id } },
  });