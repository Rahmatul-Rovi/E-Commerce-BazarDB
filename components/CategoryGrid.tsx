const categories = [
  { name: "Fruits & Vegetables", emoji: "🥦", slug: "fruits-vegetables" },
  { name: "Meat & Fish", emoji: "🍗", slug: "meat-fish" },
  { name: "Cooking Essentials", emoji: "🍳", slug: "cooking" },
  { name: "Beverages", emoji: "🧃", slug: "beverages" },
  { name: "Home & Cleaning", emoji: "🧼", slug: "cleaning" },
  { name: "Baby Care", emoji: "🍼", slug: "babycare" },
  { name: "Beauty Products", emoji: "💄", slug: "beauty" },
  { name: "Pet Care", emoji: "🐾", slug: "pet-care" },
];

export default function CategoryGrid() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          Shop by Category
        </h2>
        <a href="/categories" className="text-primary font-medium text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          // এখানে ভুল ছিল, <a> ট্যাগটা শুরু করা হয়নি
          <a
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-2 bg-surface hover:bg-primary-light rounded-2xl p-4 transition-colors group"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full text-2xl shadow-sm group-hover:scale-105 transition-transform">
              {cat.emoji}
            </div>
            <p className="text-xs md:text-sm text-center font-medium text-gray-700">
              {cat.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}