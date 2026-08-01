"use client";

import { useEffect, useState } from "react";

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
}