import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
    
      <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-3xl flex items-center justify-center text-5xl shadow-sm mb-6 animate-bounce">
        🔍
      </div>
      
    
      <h1 className="font-heading text-3xl font-extrabold text-gray-950 tracking-wide md:text-4xl">
        Product Not Found
      </h1>
      
   
      <p className="text-gray-500 mt-3 text-base max-w-md font-medium leading-relaxed">
        Sorry, we couldn't find the product you're looking for. It might be out of stock or URL is incorrect.
      </p>
      
   
      <Link
        href="/"
        className="mt-8 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
      >
        Back to Home
      </Link>
    </div>
  );
}