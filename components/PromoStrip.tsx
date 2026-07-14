export default function PromoStrip() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-primary rounded-2xl p-6 md:p-8 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-1">New Customer Offer</p>
            <h3 className="font-heading text-white text-2xl font-bold">Get 15% Off</h3>
            <p className="text-white/80 text-sm mt-1">On your first order</p>
            <button className="mt-4 bg-white text-primary-dark font-semibold text-sm px-5 py-2 rounded-full">
              Shop Now
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium mb-1">Weekend Special</p>
            <h3 className="font-heading text-white text-2xl font-bold">Fresh Meat & Fish</h3>
            <p className="text-white/70 text-sm mt-1">Up to 20% off, today only</p>
            <button className="mt-4 bg-accent text-white font-semibold text-sm px-5 py-2 rounded-full">
              Explore
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}