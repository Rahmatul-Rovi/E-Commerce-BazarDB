"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/router";
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
    const [order , setOrder] = useState<Order | null>(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=> {
        fetch("/api/my-orders")
        .then((res)=> res.json())
        .then((data : Order[]) => {
            const found = data.find((o) => o.id === params.id);
        setOrder(found || null);
        setLoading(false);
        });
    }, [params.id]);
}