"use client";

import { useEffect, useState } from "react";

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

  useEffect(()=>{
     loadCategories();
  }, []);
  const handleNameChange = (name: string) => {
    setForm({
      name,
      slug: name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  }
}