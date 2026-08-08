import { prisma } from "@/lib/prisma";

export default async function AdminOverview() {
    const [totalProducts, totalOrders, totalUsers, orders] = await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.user.count(),
        prisma.order.findMany({
            orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: true },
        }),
    ]);
}