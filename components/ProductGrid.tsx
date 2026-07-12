import ProductCard from "./ProductCard";

// আপাতত dummy data — পরে DB থেকে আসবে
const dummyProducts = [
  {
    id: "1",
    name: "Fresh Red Apple (1kg)",
    slug: "fresh-red-apple",
    price: 250,
    discount: 10,
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400",
    stock: 20,
  },
  {
    id: "2",
    name: "Broiler Chicken (1kg)",
    slug: "broiler-chicken",
    price: 200,
    discount: null,
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400",
    stock: 15,
  },
  {
    id: "3",
    name: "Basmati Rice (5kg)",
    slug: "basmati-rice",
    price: 750,
    discount: 5,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    stock: 0,
  },
  {
    id: "4",
    name: "Fresh Milk (1L)",
    slug: "fresh-milk",
    price: 90,
    discount: null,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400",
    stock: 30,
  },
];

export default function ProductGrid() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          Popular Products
        </h2>
        <a href="/products" className="text-primary font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}