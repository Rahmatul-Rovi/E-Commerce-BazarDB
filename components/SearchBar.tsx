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
}
