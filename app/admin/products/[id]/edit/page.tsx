import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
      <ProductForm
        productId={product.id}
        initialData={{
          name: product.name,
          slug: product.slug,
          price: product.price.toString(),
          discount: product.discount?.toString() || "",
          imageUrl: product.imageUrl,
          stock: product.stock.toString(),
          categoryId: product.categoryId,
        }}
      />
    </div>
  );
}