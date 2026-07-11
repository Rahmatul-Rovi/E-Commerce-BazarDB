import { LucideSearch } from "lucide-react"; 

export default function Banner() {
  return (
    <section className="bg-primary-light rounded-3xl mx-4 md:mx-8 mt-6 px-6 md:px-16 py-12 md:py-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      
      {/* বাম পাশের টেক্সট এবং সার্চ কন্টেন্ট */}
      <div className="max-w-xl z-10 w-full">
        <p className="text-primary-dark font-bold text-xs md:text-sm mb-3 tracking-widest uppercase">
          Fresh to your doorstep
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Grocery delivered <br />
          <span className="text-primary-dark">in under an hour</span>
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg max-w-md">
          Fresh produce, daily essentials, and more — order now, pay on delivery.
        </p>

        {/* সার্চ বার */}
        <div className="mt-8 flex items-center bg-white p-1.5 rounded-full shadow-md border border-gray-100 max-w-md w-full">
          <div className="pl-4 text-gray-400 hidden sm:block">
            {/* সার্চ আইকন (আপনার সুবিধামত যেকোনো আইকন লাইব্রেরি ইউজ করতে পারেন) */}
            <span className="text-xl">🔍</span> 
          </div>
          <input
            type="text"
            placeholder="Search for fresh products, veggies..."
            className="flex-1 px-3 py-2.5 rounded-full text-sm md:text-base text-gray-800 focus:outline-none bg-transparent"
          />
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* ডান পাশের ইমেজ/ইলস্ট্রেশন প্লেসহোল্ডার (বড় স্ক্রিনের জন্য) */}
      <div className="hidden lg:block relative w-1/2 max-w-md aspect-square">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600" 
          alt="Fresh Groceries" 
          className="w-full h-full object-cover rounded-2xl rotate-2 shadow-xl border-4 border-white"
        />
      </div>

      {/* Floating Badge (Signature Element) */}
      <div className="hidden md:flex absolute bottom-12 right-12 lg:bottom-auto lg:top-12 lg:right-1/2 lg:translate-x-1/3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 items-center gap-3 border border-white animate-pulse">
        <span className="text-3xl bg-primary-light p-2 rounded-xl">⏱</span>
        <div>
          <p className="font-heading font-extrabold text-gray-900 text-lg leading-none">1 Hour</p>
          <p className="text-gray-500 text-xs font-medium mt-1">Delivery Promise</p>
        </div>
      </div>

      {/* ব্যাকগ্রাউন্ড ডেকোরেশন (লুক আরও প্রিমিয়াম করার জন্য) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}