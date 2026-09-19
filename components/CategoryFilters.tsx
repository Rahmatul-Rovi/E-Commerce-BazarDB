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

   const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const highestPrice = useMemo(
    () => Math.max(...products.map((p) => p.price), 0),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.price <= maxPrice);

    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    switch (sort) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
        case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [products, sort, maxPrice, inStockOnly]);