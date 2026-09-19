import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    orderBy: { name: "asc" },
  });

  return (
    <main className="bg-white min-h-screen pb-16">
      <div className="px-4 md:px-8 pt-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{category.name}</span>
      </div>

      <div className="px-4 md:px-8 mt-4">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
          {category.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </p>
      </div>

      <div className="px-4 md:px-8 mt-6">
        <CategoryFilters products={products} />
      </div>
    </main>
  );
}