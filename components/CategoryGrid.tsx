import { prisma } from "@/lib/prisma";
import Link from "next/link"; 

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

export default async function CategoryGrid() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <section className="px-4 md:px-8 mt-14 mb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
          Shop by Category
        </h2>
        <Link href="/categories" className="text-primary font-semibold text-sm hover:underline transition-all">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-3 bg-surface hover:bg-white border border-transparent hover:border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group -translate-y-0 hover:-translate-y-1"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl text-3xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-300">
              {categoryEmojis[cat.slug] || "🛒"}
            </div>
            
            <p className="text-xs md:text-sm text-center font-semibold text-gray-800 tracking-wide group-hover:text-primary transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}