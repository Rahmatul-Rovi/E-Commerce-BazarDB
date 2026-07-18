import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";
import AddToCartBox from "@/components/AddToCartBox";
import ProductCard from "@/components/ProductCard";

export default async function ProductDetailsPage({
    params,
}:{
    params:Promise<{ slug: string }>;
}){
    const {slug} = await params;
    const product = await prisma.product.findUnique({
        where: {slug},
        include: {category: true},
    });
    if(!product){
        notFound();
    }
    const hasDiscount = product.discount && product.discount > 0;
    const finalPrice = hasDiscount ? product.price - product.price * (product.discount! / 100) : product.price;

    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: {not: product.id},
        },
        take:4,
    });

     return (
    <main className="bg-white min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="px-4 md:px-8 pt-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <a href={`/category/${product.category.slug}`} className="hover:text-primary">
          {product.category.name}
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="px-4 md:px-8 mt-6 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Image */}
        <div className="relative">
          {hasDiscount && (
            <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-3 py-1.5 rounded-full z-10">
              -{product.discount}% OFF
            </span>
          )}
          <div className="aspect-square bg-surface rounded-3xl overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-primary font-medium text-sm">{product.category.name}</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="font-heading text-3xl font-bold text-gray-900">
              ৳{finalPrice.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                ৳{product.price.toFixed(0)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {product.stock > 0 ? (
              <span className="text-primary-dark font-medium">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </p>

          <div className="mt-6">
            <AddToCartBox stock={product.stock} />
          </div>

          {/* Trust info */}
          <div className="grid grid-cols-3 gap-3 mt-8 border-t border-gray-100 pt-6">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck size={20} className="text-primary" />
              <p className="text-xs text-gray-500">Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <ShieldCheck size={20} className="text-primary" />
              <p className="text-xs text-gray-500">Quality Checked</p>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw size={20} className="text-primary" />
              <p className="text-xs text-gray-500">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="px-4 md:px-8 mt-16 max-w-5xl mx-auto">
          <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900 mb-5">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );

}