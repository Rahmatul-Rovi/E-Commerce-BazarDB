"use client";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number | null;
  imageUrl: string;
  stock: number;
};

type SortOption = "default" | "price-low" | "price-high" | "name-az" | "name-za";

export default function CategoryFilters({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const highest = Math.max(...products.map((p) => p.price), 0);
    return highest;
  });