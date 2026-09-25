import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";

export default async function ProductGrid() {
  const products = await prisma.product.findMany({
    take: 12,
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  });

   if (products.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          Popular Products
        </h2>
        <a href="/products" className="text-primary font-medium text-sm hover:underline">
          View All
        </a>
      </div>
export default function ProductGrid() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          Popular Products
        </h2>
        <a href="/products" className="text-primary font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}