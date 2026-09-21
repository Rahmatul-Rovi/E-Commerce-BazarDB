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

   const resetFilters = () => {
    setSort("default");
    setMaxPrice(highestPrice);
    setInStockOnly(false);
  };

   return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters sidebar - desktop */}
      <aside className="hidden lg:block w-56 shrink-0">
        <FilterPanel
          sort={sort}
          setSort={setSort}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          highestPrice={highestPrice}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          resetFilters={resetFilters}
        />
      </aside>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters(true)}
        className="lg:hidden flex items-center gap-2 bg-surface text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl w-fit"
      >
        <SlidersHorizontal size={16} />
        Filters & Sort
      </button>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />