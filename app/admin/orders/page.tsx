"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

    if(res.ok) {
      setOrders((prev)=> 
       prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );
       Swal.fire({
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 1000,
        customClass: { popup: "rounded-2xl" },
      });
    }
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading orders...</p>;

  return(
    <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">Orders</h1>
      <p className="text-gray-500 text-sm mb-6">{orders.length} orders total</p>

      {orders.length === 0 ? (
         <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <ShoppingBag size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.user.name} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                 <div className="flex items-center gap-4 shrink-0">
                  <p className="font-heading font-bold text-gray-900">
                    ৳{order.total.toFixed(0)}
                  </p>
                   <select
                    value={order.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize border-0 cursor-pointer ${
                      order.status === "delivered"
                        ? "bg-primary-light text-primary-dark"
                        : order.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >{statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </button>

                {expandedId === order.id && (
                <div className="border-t border-gray-100 p-5 bg-surface">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                        Items
                      </p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-9 h-9 rounded-lg object-cover bg-white"
                            />
                              <p className="text-sm text-gray-700 flex-1 line-clamp-1">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} × ৳{item.price.toFixed(0)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                     <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                        Delivery Info
                      </p>
                      <p className="text-sm text-gray-700">{order.fullName}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.address}, {order.city}
                      </p>
      )}
    </div>
  )
}