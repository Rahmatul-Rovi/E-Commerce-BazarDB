import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
      <ProductForm />
    </div>
  );
}