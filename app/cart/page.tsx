"use client";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const { items, increaseQty, decreaseQty, removeItem, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={56} className="text-gray-300 mb-4" />
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Your cart is currently empty. Start exploring to add items!
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

  return (
    <main className="bg-white min-h-screen pb-16 px-4 md:px-8 pt-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Your Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const finalPrice = item.discount
              ? item.price - item.price * (item.discount / 100)
              : item.price;

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-surface rounded-2xl p-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-white"
                />

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-medium text-gray-800 hover:text-primary text-sm md:text-base line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    ৳{finalPrice.toFixed(0)}{" "}
                    {item.discount ? (
                      <span className="line-through text-gray-400 ml-1">
                        ৳{item.price.toFixed(0)}
                      </span>
                    ) : null}
                  </p>
                </div>

                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white shrink-0">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-9 flex items-center justify-center text-gray-600 hover:bg-surface"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-9 flex items-center justify-center text-gray-600 hover:bg-surface"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-surface rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>৳{totalPrice().toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-primary-dark font-medium">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-heading font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>৳{totalPrice().toFixed(0)}</span>
          </div>

          <Link
            href="/checkout"
            className="block text-center mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full transition-colors"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/"
            className="block text-center mt-3 text-sm text-gray-500 hover:text-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}