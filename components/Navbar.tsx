"use client";

import { useState } from "react";
import {
  ShoppingCart,
  MapPin,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const quickCategories = [
  { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
  { name: "Meat & Fish", slug: "meat-fish" },
  { name: "Cooking Essentials", slug: "cooking" },
  { name: "Beverages", slug: "beverages" },
  { name: "Home & Cleaning", slug: "cleaning" },
  { name: "Baby Care", slug: "babycare" },
  { name: "Beauty Products", slug: "beauty" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = 3;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 md:px-8 py-3 flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="font-bold text-xl text-gray-900 hidden sm:block">
            Bazar<span className="text-primary">DB</span>
          </span>
        </a>

        {/* Location */}
        <button className="hidden lg:flex items-center gap-1.5 text-sm text-gray-700 border-l border-gray-200 pl-4 shrink-0">
          <MapPin size={16} className="text-primary" />
          <div className="text-left">
            <p className="text-[11px] text-gray-400 leading-none">
              Deliver to
            </p>
            <p className="font-medium leading-tight flex items-center gap-1">
              Dhaka <ChevronDown size={14} />
            </p>
          </div>
        </button>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto items-center bg-surface rounded-full px-4 py-2.5 border border-gray-100 focus-within:ring-2 focus-within:ring-primary">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <a
            href="/login"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary"
          >
            <User size={20} />
            <span className="hidden lg:block">Login</span>
          </a>

          <a
            href="/cart"
            className="relative flex items-center text-gray-700 hover:text-primary"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-surface rounded-full px-4 py-2.5 border border-gray-100">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Desktop Categories */}
      <div className="hidden md:flex items-center gap-6 px-8 py-2.5 border-t border-gray-50 overflow-x-auto">
        {quickCategories.map((cat) => (
          <a
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="text-sm text-gray-600 hover:text-primary whitespace-nowrap font-medium"
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          <a
            href="/login"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <User size={18} />
            Login
          </a>

          <button className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-primary" />
            Deliver to: Dhaka
          </button>

          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            {quickCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm text-gray-700 py-1"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}