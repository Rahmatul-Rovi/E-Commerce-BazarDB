"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(()=> {
    fetch("/api/my-orders")
    .then((res) => res.json())
    .then((data)=> {
       setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading orders...</p>;
  }

  return(
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
      ): (
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
    </div>
  )
}