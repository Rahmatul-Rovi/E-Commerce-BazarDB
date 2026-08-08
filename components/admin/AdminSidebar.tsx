"use client";

import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  Users,
  LogOut,
  Store,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
    const pathName = usePathname();
}

