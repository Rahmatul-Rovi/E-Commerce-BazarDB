"use client";

import { useRouter } from "next/router";
import { useState } from "react";

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

export default function ProductForm({
    productId,
    initialData,
} : {
    productId?: string;
    initialData?: string;
}) {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<ProductFormData>(
        initialData || {
      name: "",
      slug: "",
      price: "",
      discount: "",
      imageUrl: "",
      stock: "",
      categoryId: "",
    }
    );
}