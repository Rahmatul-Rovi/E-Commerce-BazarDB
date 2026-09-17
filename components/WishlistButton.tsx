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