"use client";

export type CartItem = {
id: string;
name: string;
slug: string;
price: number;
discount?: number| null;
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
   totalIems: () => number;
   totalPrice: () => number;
};