"use client";

import { useEffect, useState } from "react";

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
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  user: { name: string; email: string };
  items: OrderItem[];
};

const statusOptions = ["pending", "processing", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadOrders = () => {
    fetch("/api/admin/orders")
    .then((res)=> res.json())
    .then((data)=>{
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(()=> {
    loadOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = fetch(`/api/admin/orders/${id}`,{
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ status: newStatus }),
    });
  }
}