"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number | null;
  imageUrl: string;
  stock: number;
};

function SearchResults(){
        const searchParams = useSearchParams();
          const query = searchParams.get("q") || "";
          const [products, setProducts] = useState<Product[]>([]);
          const [loading, setLoading] = useState(true);

          useEffect(()=> {
            if(!query) {
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

  return(
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
  )
          })
}