import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white min-h-screen px-4 md:px-8 pt-8 pb-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </main>
  );
}