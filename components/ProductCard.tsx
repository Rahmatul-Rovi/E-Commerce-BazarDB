"use client";

import { useCartStore } from "@/app/store/cartStore";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";


type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number | null;
  imageUrl: string;
  stock: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - product.price * (product.discount! / 100)
    : product.price;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      discount: product.discount,
      imageUrl: product.imageUrl,
      stock: product.stock,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-shadow group relative">
      {hasDiscount && (
        <span className="absolute top-3 left-3 bg-accent text-white text-[11px] font-bold px-2 py-1 rounded-full z-10">
          -{product.discount}%
        </span>
      )}

      <a href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-surface rounded-xl overflow-hidden mb-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <p className="text-sm text-gray-800 font-medium line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </p>
      </a>

      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="font-heading font-bold text-gray-900">
            ৳{finalPrice.toFixed(0)}
          </p>
          {hasDiscount && (
            <p className="text-xs text-gray-400 line-through">
              ৳{product.price.toFixed(0)}
            </p>
          )}
        </div>

        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-full transition-colors ${
              added
                ? "bg-primary-dark text-white"
                : "bg-primary hover:bg-primary-dark text-white"
            }`}
            aria-label="Add to cart"
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        ) : (
          <span className="text-xs text-red-500 font-medium">Out of Stock</span>
        )}
      </div>
    </div>
  );
}