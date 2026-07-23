"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  MapPin,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Search,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const quickCategories = [
  { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
  { name: "Meat & Fish", slug: "meat-fish" },
  { name: "Cooking Essentials", slug: "cooking" },
  { name: "Beverages", slug: "beverages" },
  { name: "Home & Cleaning", slug: "cleaning" },
  { name: "Baby Care", slug: "babycare" },
  { name: "Beauty Products", slug: "beauty" },
];

function UserAvatar({ name, image, size = 36 }: { name?: string | null; image?: string | null; size?: number }) {
  const initial = name?.charAt(0).toUpperCase() || "U";

  if (image) {
    return (
      <img
        src={image}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full object-cover border border-gray-200"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-primary text-white font-semibold flex items-center justify-center shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const cartCount = 3;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 md:px-8 py-3 flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="font-bold text-xl text-gray-900 hidden sm:block">
            Bazar<span className="text-primary">DB</span>
          </span>
        </Link>

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

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <Search size={18} className="text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Right Side (Desktop Auth & Cart) */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          {session?.user ? (
            <div className="hidden sm:block relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2"
              >
                <UserAvatar name={session.user.name} image={session.user.image} />
              </button>

              {userMenuOpen && (
                <>
                  {/* Click outside overlay */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-48 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              <User size={20} />
              <span>Login</span>
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center text-gray-700 hover:text-primary transition-colors p-1"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
          <Search size={18} className="text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Desktop Quick Categories Bar */}
      <div className="hidden md:flex items-center gap-6 px-8 py-2.5 border-t border-gray-50 overflow-x-auto">
        {quickCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="text-sm text-gray-600 hover:text-primary whitespace-nowrap font-medium transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-4 bg-white">
          {/* Mobile Auth Check */}
          {session?.user ? (
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <UserAvatar name={session.user.name} image={session.user.image} size={32} />
                <span className="text-sm font-bold text-gray-800">
                  {session.user.name}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-800 pb-3 border-b border-gray-100"
            >
              <User size={18} className="text-primary" />
              Login / Register
            </Link>
          )}

          {/* Location */}
          <button className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-primary" />
            Deliver to: <span className="font-semibold text-gray-900">Dhaka</span>
          </button>

          {/* Quick Categories Header */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Categories
            </p>
            <div className="flex flex-col gap-1">
              {quickCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-gray-700 py-1.5 hover:text-primary transition-colors font-medium"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}