"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number | null;
  imageUrl: string;
  stock: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty = 1) => {
        const existing = get().items.find((i) => i.id === item.id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: Math.min(i.quantity + qty, i.stock) }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: qty }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      increaseQty: (id) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) } : i
          ),
        });
      },

      decreaseQty: (id) => {
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => {
          const price = i.discount ? i.price - i.price * (i.discount / 100) : i.price;
          return sum + price * i.quantity;
        }, 0),
    }),
    {
      name: "bazardb-cart",
    }
  )
);