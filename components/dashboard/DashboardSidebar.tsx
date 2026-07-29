"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, User, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: Package },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-surface rounded-2xl p-5 lg:sticky lg:top-24">
        {/* User info */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary text-white font-semibold flex items-center justify-center text-lg">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-white"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}