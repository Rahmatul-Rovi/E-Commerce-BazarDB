"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, CreditCard, Package } from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; imageUrl: string; slug: string };
};

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  items: OrderItem[];
};

const statusSteps = ["pending", "processing", "delivered"];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-orders")
      .then((res) => res.json())
      .then((data: Order[]) => {
        const found = data.find((o) => o.id === params.id);
        setOrder(found || null);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <p className="text-gray-500 text-sm">Loading order...</p>;

  if (!order) {
    return (
      <div className="text-center py-16">
        <Package size={40} className="text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Order not found.</p>
        <Link href="/dashboard/orders" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div>
      <button
        onClick={() => router.push("/dashboard/orders")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-4"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </button>

      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Order #{order.id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${
            order.status === "delivered"
              ? "bg-primary-light text-primary-dark"
              : order.status === "pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Status tracker */}
      {order.status !== "cancelled" && (
        <div className="bg-surface rounded-2xl p-6 mb-6">
          <div className="flex items-center">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      i <= currentStepIndex
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p
                    className={`text-xs mt-1.5 capitalize ${
                      i <= currentStepIndex ? "text-gray-800 font-medium" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {i < statusSteps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      i < currentStepIndex ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 bg-surface rounded-2xl p-5">
          <h2 className="font-heading font-semibold text-gray-900 mb-4">Items</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded-xl bg-white shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.quantity} × ৳{item.price.toFixed(0)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 shrink-0">
                  ৳{(item.price * item.quantity).toFixed(0)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-heading font-bold text-gray-900">
            <span>Total</span>
            <span>৳{order.total.toFixed(0)}</span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-surface rounded-2xl p-5 h-fit space-y-4">
          <h2 className="font-heading font-semibold text-gray-900">Delivery Info</h2>

          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-gray-800">{order.fullName}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {order.address}, {order.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={16} className="text-gray-400 shrink-0" />
            <p className="text-sm text-gray-800">{order.phone}</p>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard size={16} className="text-gray-400 shrink-0" />
            <p className="text-sm text-gray-800">
              {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}