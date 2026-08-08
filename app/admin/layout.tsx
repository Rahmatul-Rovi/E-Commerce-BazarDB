import { requireAdmin } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex bg-surface min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 min-w-0">{children}</main>
    </div>
  );
}