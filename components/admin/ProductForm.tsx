"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      const data = await res.json();
      setLoading(false);

      off(!res.ok){
         Swal.fire({
        icon: "error",
        title: "Failed",
        text: data.error || "Something went wrong",
        customClass: { popup: "rounded-2xl" },
      });
      return;
      }

      await Swal.fire({
        icon: "success",
      title: productId ? "Product Updated" : "Product Added",
      showConfirmButton: false,
      timer: 1300,
      customClass: { popup: "rounded-2xl" },
      });
      router.push("/admin/products");
      router.refresh();
   };

   return(
     <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

       <div>
        <label className="text-sm font-medium text-gray-700">Slug (URL)</label>
        <input
          type="text"
          required
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
        />
      </div>
       <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Price (৳)</label>
          <input
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
          <div>
          <label className="text-sm font-medium text-gray-700">Discount % (optional)</label>
          <input
            type="number"
            step="0.01"
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

       <div>
        <label className="text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          required
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="https://images.unsplash.com/..."
          className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-xl mt-2 border border-gray-200"
          />
        )}
      </div>

       <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
          <input
            type="number"
            required
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

         <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
   )
}