"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
};

export default function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all ${
          mobile ? "" : ""
        }`}
      >
        <Search size={18} className="text-gray-400 mr-2 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for products..."
          className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800 placeholder-gray-400"
        />
      </form>

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
  );
}