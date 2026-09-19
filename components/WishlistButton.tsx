"use client";

import { useWishlistStore } from "@/app/store/wishlistStore";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";

export default function WishlistButton({
  productId,
  size = 16,
  className = "",
}: {
  productId: string;
  size?: number;
  className?: string;
}) {
  const { data: session } = useSession();
  const { ids, toggle } = useWishlistStore();
  const isWishlisted = ids.has(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      Swal.fire({
        icon: "info",
        title: "Please Log In",
        text: "Log in to save products to your wishlist.",
        customClass: { popup: "rounded-2xl" },
      });
      return;
    }

    toggle(productId); // optimistic update

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      toggle(productId); // revert on failure
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors ${className}`}
      aria-label="Toggle wishlist"
    >
      <Heart
        size={size}
        className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  );
}