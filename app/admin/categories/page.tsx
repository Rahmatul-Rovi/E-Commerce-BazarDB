"use client";

import { useState } from "react";

type Category = { id: string; name: string; slug: string; _count?: { products: number } };

export default function AdminCategoriesPage() {
    const [categories , setCaregories] = useState<Category[]>([]);
    const [loading , setLoading] = useState(true);
     const [form, setForm] = useState({ name: "", slug: "" });
  const [submitting, setSubmitting] = useState(false);

  const loadCategories = () => {
    fetch("/api/categories")
    .then((res) => res.json())
    .then((data)=> {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
    });
  };
}