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
  
        {/* সার্চ বার */}
        <div className="mt-8 flex items-center bg-white p-1.5 rounded-full shadow-md border border-gray-100 max-w-md w-full">
          <div className="pl-4 text-gray-400 hidden sm:block">
            {/* সার্চ আইকন (আপনার সুবিধামত যেকোনো আইকন লাইব্রেরি ইউজ করতে পারেন) */}
            <span className="text-xl">🔍</span> 
          </div>
          <input
            type="text"
            placeholder="Search for fresh products, veggies..."
            className="flex-1 px-3 py-2.5 rounded-full text-sm md:text-base text-gray-800 focus:outline-none bg-transparent"
          />
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* ডান পাশের ইমেজ/ইলস্ট্রেশন প্লেসহোল্ডার (বড় স্ক্রিনের জন্য) */}
      <div className="hidden lg:block relative w-1/2 max-w-md aspect-square">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600" 
          alt="Fresh Groceries" 
          className="w-full h-full object-cover rounded-2xl rotate-2 shadow-xl border-4 border-white"
        />
      </div>

      {/* Floating Badge (Signature Element) */}
      <div className="hidden md:flex absolute bottom-12 right-12 lg:bottom-auto lg:top-12 lg:right-1/2 lg:translate-x-1/3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 items-center gap-3 border border-white animate-pulse">
        <span className="text-3xl bg-primary-light p-2 rounded-xl">⏱</span>
        <div>
          <p className="font-heading font-extrabold text-gray-900 text-lg leading-none">1 Hour</p>
          <p className="text-gray-500 text-xs font-medium mt-1">Delivery Promise</p>
        </div>
      </div>

      {/* ব্যাকগ্রাউন্ড ডেকোরেশন (লুক আরও প্রিমিয়াম করার জন্য) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}