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

            <div className="relative bg-white w-72 max-w-[85vw] h-full ml-auto p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-gray-900">Filters & Sort</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
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

             <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full transition-colors"
            >
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="flex-1 min-w-0">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}