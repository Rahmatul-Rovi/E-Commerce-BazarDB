"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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


export default function WishlistPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          setItems(Array.isArray(data) ? data : []);
          setLoading(false);
        });
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  if (!session?.user) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <Heart size={56} className="text-gray-300 mb-4" />
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Please Log In
        </h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Log in to view and manage your wishlist.
        </p>
