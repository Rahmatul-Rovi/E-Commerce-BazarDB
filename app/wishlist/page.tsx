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

         <Link
          href="/login"
          className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Log In
        </Link>
      </main>
    );
  }

   return (
    <main className="bg-white min-h-screen pb-16 px-4 md:px-8 pt-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        My Wishlist
      </h1>
      <p className="text-gray-500 mb-6">
        {items.length} item{items.length !== 1 ? "s" : ""} saved
      </p>


      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Your wishlist is empty.</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Start Shopping
          </Link>
        </div>

        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </main>
  );
}
