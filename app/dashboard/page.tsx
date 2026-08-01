"use client";

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