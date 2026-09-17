"use client";

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