import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({
    params,
}:{
    params: Promise<{slug:string}>;
})
{
    const {slug} = await params;
    const category = await prisma.category.findUnique({
        where: {slug},
    });
 
    if(!category){
        notFound();
    }

    const products = await prisma.product.findMany({
        where: {categoryId: category.id},
        orderBy: {name: "asc"},
    });
   return (
    <main className="bg-white min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="px-4 md:px-8 pt-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{category.name}</span>
      </div>

      {/* Header */}
      <div className="px-4 md:px-8 mt-4">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
          {category.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Product grid */}
      <div className="px-4 md:px-8 mt-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-gray-500">No products found in this category yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}