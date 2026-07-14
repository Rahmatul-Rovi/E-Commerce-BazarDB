export default function AppPromo() {
  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="bg-primary-light rounded-3xl px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
            Get the BazarDB App
          </h3>
          <p className="text-gray-600 mt-2 max-w-md">
            Order faster, track deliveries live, and get app-only deals.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-medium">
            📱 Get it on Play Store
          </button>
          <button className="bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-medium">
            🍎 App Store
          </button>
        </div>
      </div>
    </section>
  );
}