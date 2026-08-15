import { Package, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number | null;
  imageUrl: string;
  stock: number;
  category: { name: string };
};

export default function AdminProductsPage() {
    const [products , setProducts] = useState<Product[]>([]);
    const [loading , setLoading] = useState(true);

    const loadProducts = () => {
        fetch("/api/admin/products")
        .then((res)=> res.json())
        .then((data) => {
            setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
        });
    };

    useEffect(()=> {
        loadProducts();
    }, []);

    const handleDelete = (id: string, name: string) => {
        Swal.fire({
      title: "Delete product?",
      text: `Are you sure you want to delete "${name}"? This can't be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Yes, delete it",
      customClass: { popup: "rounded-2xl" },
    }) .then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
        if (res.ok) {
          setProducts((prev) => prev.filter((p) => p.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted",
            showConfirmButton: false,
            timer: 1200,
            customClass: { popup: "rounded-2xl" },
          });
        } else {
          Swal.fire({ icon: "error", title: "Failed to delete", customClass: { popup: "rounded-2xl" } });
        }
      }
    });
  };

   if (loading) return <p className="text-gray-500 text-sm">Loading products...</p>;

   return(
     <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>
       {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Package size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No products yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-surface text-gray-500 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
   )
    }
