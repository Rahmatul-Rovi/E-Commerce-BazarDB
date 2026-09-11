"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Search as SearchIcon } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number | null;
  imageUrl: string;
  stock: number;
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [query]);

  return (
    <main className="bg-white min-h-screen pb-16 px-4 md:px-8 pt-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
        Search results for &quot;{query}&quot;
      </h1>
      <p className="text-gray-500 mt-1">
        {loading ? "Searching..." : `${products.length} products found`}
      </p>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found for &quot;{query}&quot;</p>
            <p className="text-gray-400 text-sm mt-1">Try searching with a different keyword</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}