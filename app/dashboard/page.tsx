"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle, DollarSign } from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; imageUrl: string };
};

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function DashboardOverview() {
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

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">
        Dashboard
      </h1>
      <p className="text-gray-500 text-sm mb-6">Welcome back! Here&apos;s your account summary.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface rounded-2xl p-5">
          <Package size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">{totalOrders}</p>
          <p className="text-xs text-gray-500">Total Orders</p>
        </div>
        <div className="bg-surface rounded-2xl p-5">
          <Clock size={20} className="text-accent mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">{pendingOrders}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div className="bg-surface rounded-2xl p-5">
          <CheckCircle size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">{deliveredOrders}</p>
          <p className="text-xs text-gray-500">Delivered</p>
        </div>
        <div className="bg-surface rounded-2xl p-5">
          <DollarSign size={20} className="text-primary mb-2" />
          <p className="text-2xl font-heading font-bold text-gray-900">
            ৳{totalSpent.toFixed(0)}
          </p>
          <p className="text-xs text-gray-500">Total Spent</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-gray-900">
          Recent Orders
        </h2>
        <Link href="/dashboard/orders" className="text-primary text-sm font-medium hover:underline">
          View All
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <div className="bg-surface rounded-2xl p-8 text-center">
          <p className="text-gray-500 text-sm">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-surface rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  Order #{order.id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-heading font-bold text-gray-900">৳{order.total.toFixed(0)}</p>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}