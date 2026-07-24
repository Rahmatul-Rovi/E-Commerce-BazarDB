"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
    const { items, increaseQty, decreaseQty, removeItem, totalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(()=> {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    if(items.length === 0) {
     return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={56} className="text-gray-300 mb-4" />
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Start Shopping
        </Link>
      </main>
    );
    }
}