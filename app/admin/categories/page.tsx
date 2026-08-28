"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

    const data = await res.json();
    setSubmitting(false);

     if (!res.ok) {
      Swal.fire({ icon: "error", title: "Failed", text: data.error, customClass: { popup: "rounded-2xl" } });
      return;
    }

    setForm({ name: "", slug: "" });
    loadCategories();
    Swal.fire({
      icon: "success",
      title: "Category Added",
      showConfirmButton: false,
      timer: 1200,
      customClass: { popup: "rounded-2xl" },
    });
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Delete category?",
      text: `Delete "${name}"? Products inside must be removed first.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Yes, delete it",
      customClass: { popup: "rounded-2xl" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
          loadCategories();
          Swal.fire({ icon: "success", title: "Deleted", showConfirmButton: false, timer: 1200, customClass: { popup: "rounded-2xl" } });
        } else {
          Swal.fire({ icon: "error", title: "Failed", text: data.error, customClass: { popup: "rounded-2xl" } });
        }
      }
    });
  };

  return(
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">Categories</h1>
      
    </div>
  )
}