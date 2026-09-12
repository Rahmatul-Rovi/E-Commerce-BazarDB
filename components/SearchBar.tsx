"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    if(query.trim()){
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
}
