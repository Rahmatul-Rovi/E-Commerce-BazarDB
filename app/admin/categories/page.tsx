"use client";

import { Plus } from "lucide-react";
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
      <div className="grid md:grid-cols-3 gap-6">
        {/* Add form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-5 h-fit space-y-3">
          <h2 className="font-heading font-semibold text-gray-900 text-sm mb-2">Add Category</h2>
          <input
            type="text"
            placeholder="Category name"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
           <input
            type="text"
            placeholder="slug"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
          />

           <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
          >
            <Plus size={16} />
            {submitting ? "Adding..." : "Add Category"}
          </button>
        </form>

         {/* List */}
        <div className="md:col-span-2">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : categories.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <Tag size={36} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No categories yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-5 py-3"
                >
                   <div>
                    <p className="text-sm font-medium text-gray-800">{cat.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{cat.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                   </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
    </div>
  )
}