export default function Banner() {
  return (
    <section className="bg-primary-light rounded-3xl mx-4 md:mx-8 mt-6 px-6 md:px-12 py-10 md:py-14 relative overflow-hidden">
      <div className="max-w-lg">
        <p className="text-primary-dark font-semibold text-sm mb-2 tracking-wide">
          FRESH TO YOUR DOORSTEP
        </p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Grocery delivered <br /> in under an hour
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg">
          Fresh produce, daily essentials, and more — order now, pay on delivery.
        </p>

        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
          <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Floating badge - signature element */}
      <div className="hidden md:flex absolute top-8 right-10 bg-white rounded-2xl shadow-lg px-5 py-4 items-center gap-3">
        <span className="text-2xl">⏱</span>
        <div>
          <p className="font-heading font-bold text-gray-900 text-lg">1 Hour</p>
          <p className="text-gray-500 text-xs">Delivery Promise</p>
        </div>
      </div>
    </section>
  );
}