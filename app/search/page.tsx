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
          })
}