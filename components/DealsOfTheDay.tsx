import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import CountdownBadge from "./CountdownBadge";

export default async function DealsOfTheDay() {
  const dealProducts = await prisma.product.findMany({
    where: {
      discount: { gt: 0 },
    },
    orderBy: {
      discount: "desc",
    },
    take: 8,
  });

  if (dealProducts.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          🔥 Deals of the Day
        </h2>
        <CountdownBadge />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}