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
    }
