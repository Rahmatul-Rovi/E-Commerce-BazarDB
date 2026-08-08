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

     const totalRevenue = await prisma.order.aggregate({
    _sum: { total: true },
  });

  return(
    <div>
         <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">
        Admin Overview
      </h1>
      <p className="text-gray-500 text-sm mb-6">Store performance at a glance.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <DollarSign size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">
            ৳{(totalRevenue._sum.total || 0).toFixed(0)}
          </p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </div>

         <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <ShoppingBag size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">{totalOrders}</p>
          <p className="text-xs text-gray-500">Total Orders</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <Package size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">{totalProducts}</p>
          <p className="text-xs text-gray-500">Total Products</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <Users size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">{totalUsers}</p>
          <p className="text-xs text-gray-500">Total Users</p>
        </div>
      </div>
    </div>
  )
}