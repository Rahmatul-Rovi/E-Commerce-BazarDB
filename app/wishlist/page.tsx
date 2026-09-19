"use client";

type WishlistItem = {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    discount: number | null;
    imageUrl: string;
    stock: number;
  };
};