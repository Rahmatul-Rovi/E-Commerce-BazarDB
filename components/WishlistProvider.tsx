"use client";

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setIds = useWishlistStore((state) => state.setIds);