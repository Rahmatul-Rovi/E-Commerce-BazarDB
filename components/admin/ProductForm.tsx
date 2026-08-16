"use client";

type Category = {id: string ; name: string};

type ProductFormData = {
     name: string;
  slug: string;
  price: string;
  discount: string;
  imageUrl: string;
  stock: string;
  categoryId: string;
};