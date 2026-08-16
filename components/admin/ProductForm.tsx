"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

    useEffect(()=> {
        fetch("/api/categories")
        .then((res)=> res.json())
        .then((data) => setCategories(Array.isArray(data) ? data : []));
    }, []);

    const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: productId
        ? prev.slug
        : name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
    }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);

      const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
      const method = productId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(form),
      });
   }
}