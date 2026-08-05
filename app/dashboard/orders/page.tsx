"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";

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
  address: string;
  city: string;
  paymentMethod: string;
  items: OrderItem[];
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading orders...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">My Orders</h1>
      <p className="text-gray-500 text-sm mb-6">Track and view all your past orders.</p>

      {orders.length === 0 ? (
        <div className="bg-surface rounded-2xl p-10 text-center">
          <Package size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-surface rounded-2xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    order.status === "delivered"
                      ? "bg-primary-light text-primary-dark"
                      : order.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 py-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-white shrink-0"
                    />
                    <p className="text-sm text-gray-700 flex-1 line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500 shrink-0">
                      {item.quantity} × ৳{item.price.toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-sm">
                <p className="text-gray-500">
                  Delivery to: <span className="text-gray-700">{order.address}, {order.city}</span>
                </p>
                <p className="font-heading font-bold text-gray-900">
                  Total: ৳{order.total.toFixed(0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}