"use client";

export type CartItem = {
id: string;
name: string;
slug: string;
price: number;
discount?: number| null;
imageUrl: string;
stock: number;
quantity: number;
}