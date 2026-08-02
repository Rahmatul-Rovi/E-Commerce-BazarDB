"use client";

import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, DollarSign } from "lucide-react";

type orderItem = {
    id: string,
    quantity: number,
    price: number,
    product: {name: string; imageUrl: string};
};

type Order = {
    id: string,
    total: number,
    status: string,
    createdAt: string,
    items: orderItem[]
};

export default function DashboardOverview() {
    const [orders , setOrders] = useState<Order[]>([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/myOrders")
        .then((res)=> res.json())
        .then((data) => {
           setOrders(Array.isArray(data) ? data : []);
           setLoading(false);
        });
    }, []);

    const totalOrder = orders.length;
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
      </div>
  )
}