"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

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
  const [filter, setFilter] = useState<string>("all");

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

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const filters = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "delivered", label: "Delivered" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">My Orders</h1>
      <p className="text-gray-500 text-sm mb-5">Track and view all your past orders.</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? "bg-primary text-white"
                : "bg-surface text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-surface rounded-2xl p-10 text-center">
          <Package size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No orders found in this category.</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="block bg-surface rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
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
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
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

              <div className="flex items-center gap-2 py-3 overflow-hidden">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.id}
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-11 h-11 object-cover rounded-lg bg-white shrink-0"
                  />
                ))}
                {order.items.length > 4 && (
                  <span className="text-xs text-gray-500 ml-1">
                    +{order.items.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-heading font-bold text-gray-900">
                    ৳{order.total.toFixed(0)}
                  </p>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}