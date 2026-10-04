import { prisma } from "@/lib/prisma";
import Link from "next/link"; 
export const dynamic = "force-dynamic";

const categoryEmojis: Record<string, string> = {
  "fruits-vegetables": "🥦",
  "meat-fish": "🍗",
  cooking: "🍳",
  beverages: "🧃",
  cleaning: "🧼",
  babycare: "🍼",
  beauty: "💄",
  "pet-care": "🐾",
};

export default async function AllCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="bg-white min-h-screen pb-16 mt-6">
      {/* Header Section */}
      <div className="px-4 md:px-8 pt-8">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-950 tracking-wide">
          All Categories
        </h1>
        <p className="text-gray-500 mt-2 font-medium text-base">
          Browse everything we offer
        </p>
      </div>

      <div className="px-4 md:px-8 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat: { id: string; name: string; slug: string }) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-4 bg-surface hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
          >
           
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl text-3xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-300">
              {categoryEmojis[cat.slug] || "🛒"}
            </div>
            
            {/* Text Content */}
            <p className="text-sm md:text-base text-center font-bold text-gray-800 tracking-wide group-hover:text-primary transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}