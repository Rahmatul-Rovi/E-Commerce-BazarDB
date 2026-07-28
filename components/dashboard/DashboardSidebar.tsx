import { LayoutDashboard, Package, User, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: Package },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardSidebar() {
  const pathName = usePathname();
  const {data:session} = useSession();
}
