"use client";

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