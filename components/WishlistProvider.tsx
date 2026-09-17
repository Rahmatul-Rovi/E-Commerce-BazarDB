"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/app/store/wishlistStore";


export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setIds = useWishlistStore((state) => state.setIds);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setIds(data.map((w: { productId: string }) => w.productId));
          }
        });
    } else {
      setIds([]);
    }
  }, [session, setIds]);

  return <>{children}</>;
}