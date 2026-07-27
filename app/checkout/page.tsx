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

       await Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        confirmButtonColor: "#16A34A",
        confirmButtonText: "View Order",
        customClass: { popup: "rounded-2xl" },
      });

      router.push(`/order-success?orderId=${data.orderId}`);
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Could not connect to server. Please try again.",
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

     return (
    <main className="bg-white min-h-screen pb-16 px-4 md:px-8 pt-8">
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Delivery Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          <div className="bg-surface rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">
              Delivery Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
              />
              <textarea
                placeholder="Full Address (House, Road, Area)"
                required
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white resize-none"
              />
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">
              Payment Method
            </h2>

            <label className="flex items-center gap-3 bg-white border border-primary rounded-xl p-4 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={form.paymentMethod === "cod"}
                onChange={() => setForm({ ...form, paymentMethod: "cod" })}
                className="accent-primary w-4 h-4"
              />
              <div>
                <p className="font-medium text-gray-800 text-sm">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when your order arrives</p>
              </div>
            </label>
          </div>

          {/* Mobile-only submit button */}
          <button
            type="submit"
            disabled={loading}
            className="lg:hidden w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full transition-colors disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-surface rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => {
              const finalPrice = item.discount
                ? item.price - item.price * (item.discount / 100)
                : item.price;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ৳{finalPrice.toFixed(0)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 shrink-0">
                    ৳{(finalPrice * item.quantity).toFixed(0)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>৳{totalPrice().toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-primary-dark font-medium">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-heading font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>৳{totalPrice().toFixed(0)}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="hidden lg:block w-full text-center mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full transition-colors disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </main>
  );
}