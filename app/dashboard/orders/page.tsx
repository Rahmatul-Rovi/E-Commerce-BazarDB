"use client";

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
    </div>
  )
}