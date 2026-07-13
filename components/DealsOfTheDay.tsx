"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const dealProducts = [
  {
    id: "d1",
    name: "Fresh Banana (1 dozen)",
    slug: "fresh-banana",
    price: 120,
    discount: 20,
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400",
    stock: 25,
  },
  {
    id: "d2",
    name: "Farm Eggs (12 pcs)",
    slug: "farm-eggs",
    price: 150,
    discount: 15,
    imageUrl: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&q=80&w=400",
    stock: 40,
  },
  {
    id: "d3",
    name: "Cooking Oil (5L)",
    slug: "cooking-oil",
    price: 900,
    discount: 12,
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    stock: 10,
  },
  {
    id: "d4",
    name: "Onion (1kg)",
    slug: "onion",
    price: 70,
    discount: 25,
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400",
    stock: 50,
  },
];

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const diff = endOfDay.getTime() - Date.now();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ h, m, s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

export default function DealsOfTheDay() {
  const { h, m, s } = useCountdown();
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          🔥 Deals of the Day
        </h2>
        <div className="flex items-center gap-2 bg-gray-900 text-white text-sm font-mono px-3 py-1.5 rounded-full">
          <span>Ends in</span>
          <span className="font-bold">{pad(h)}:{pad(m)}:{pad(s)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}