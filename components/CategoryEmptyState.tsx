import Link from "next/link";

export default function CategoryEmptyState() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center text-4xl shadow-sm mb-5 animate-pulse">
        📦
      </div>
      
      <p className="text-gray-800 text-lg font-bold tracking-wide md:text-xl">
        No products found in this category yet.
      </p>
      <p className="text-gray-400 text-sm mt-1 max-w-xs font-medium">
        We are restocking soon. Please check back later!
      </p>
      
      <Link
        href="/"
        className="inline-block mt-6 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 tracking-wide text-base"
      >
        Back to Home
      </Link>
    </div>
  );
}