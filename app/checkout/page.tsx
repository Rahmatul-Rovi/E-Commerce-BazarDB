import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function CheckoutPage(){
    const router = useRouter();
    const {data:session, status} = useSession();
    const {items, totalPrice, clearCart} = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "Dhaka",
        paymentMethod: "cod",
    });

    useEffect(()=> {
        setMounted(true);
    }, []);

    useEffect(()=> {
        if(mounted && session?.user){
            setForm((prev) => ({ ...prev, fullName: session.user.name || "" }));
        }
    }, [mounted, session]);

    if (!mounted || status === "loading") return null;

     if (!session?.user) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Please Log In
        </h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          You need to be logged in to proceed with checkout.
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

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Add some products before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderItems = items.map((item) => {
      const finalPrice = item.discount
        ? item.price - item.price * (item.discount / 100)
        : item.price;
      return {
        productId: item.id,
        quantity: item.quantity,
        price: finalPrice,
      };
    });

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: orderItems,
          total: totalPrice(),
        }),
      });

      const data = await res.json();
      setLoading(false);

       if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: data.error || "Something went wrong",
          customClass: { popup: "rounded-2xl" },
        });
        return;
      }

      clearCart();

      

}