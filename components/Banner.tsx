"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
};

export default function Banner() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch live suggestions as the user types (debounced)
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-primary-light rounded-3xl mx-4 md:mx-8 mt-6 px-6 md:px-16 py-12 md:py-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left side text and search content */}
      <div className="max-w-xl z-10 w-full">
        <p className="text-primary-dark font-bold text-xs md:text-sm mb-3 tracking-widest uppercase">
          Fresh to your doorstep
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Grocery delivered <br />
          <span className="text-primary-dark">in under an hour</span>
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg max-w-md">
          Fresh produce, daily essentials, and more — order now, pay on delivery.
        </p>

        {/* Functional search bar with live suggestions */}
        <div ref={wrapperRef} className="relative mt-8 max-w-md w-full">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white p-1.5 rounded-full shadow-md border border-gray-100"
          >
            <div className="pl-4 text-gray-400 hidden sm:block">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search for fresh products, veggies..."
              className="flex-1 px-3 py-2.5 rounded-full text-sm md:text-base text-gray-800 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* Suggestions dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-9 h-9 rounded-lg object-cover bg-surface shrink-0"
                  />
                  <span className="text-sm text-gray-700 line-clamp-1">{product.name}</span>
                </Link>
              ))}
              <button
                onClick={handleSubmit}
                className="w-full text-left px-4 py-2.5 text-sm text-primary font-medium hover:bg-surface border-t border-gray-100"
              >
                See all results for &quot;{query}&quot;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side image/illustration placeholder (large screens only) */}
      <div className="hidden lg:block relative w-1/2 max-w-md aspect-square">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
          alt="Fresh Groceries"
          className="w-full h-full object-cover rounded-2xl rotate-2 shadow-xl border-4 border-white"
        />
      </div>

      {/* Floating badge (signature element) */}
      <div className="hidden md:flex absolute bottom-12 right-12 lg:bottom-auto lg:top-12 lg:right-1/2 lg:translate-x-1/3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 items-center gap-3 border border-white animate-pulse">
        <span className="text-3xl bg-primary-light p-2 rounded-xl">⏱</span>
        <div>
          <p className="font-heading font-extrabold text-gray-900 text-lg leading-none">1 Hour</p>
          <p className="text-gray-500 text-xs font-medium mt-1">Delivery Promise</p>
        </div>
      </div>

      {/* Background decoration for a more premium look */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}