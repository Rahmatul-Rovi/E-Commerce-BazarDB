import React from 'react';

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-emerald-50/50 via-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full">
          Welcome to BazarDB
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Fresh Groceries, <br className="hidden sm:inline" />
          <span className="text-emerald-600">Delivered Fast & Easy</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
          BazarDB is your trusted online grocery destination, bringing fresh produce, daily essentials, and household items straight to your doorstep across Bangladesh.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">&lt; 60 Mins</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Express Delivery</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">100%</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Fresh Quality</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">10k+</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-600">24/7</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Dedicated Support</p>
          </div>
        </div>
      </section>

      {/* Main Story & Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Journey & Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We started with a simple goal: to make grocery shopping fast, easy, and reliable for everyone in Bangladesh. No more standing in long lines or dealing with traffic just to get your daily essentials.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From fresh fruits and vegetables to meat, fish, beauty products, and pet care, we carefully select every single item to guarantee that only the finest quality reaches your home.
            </p>
          </div>
          <div className="bg-emerald-600 text-white p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500 rounded-full opacity-50 blur-2xl"></div>
            <h3 className="text-xl font-bold mb-3">Our 1-Hour Promise</h3>
            <p className="text-emerald-100 leading-relaxed">
              We value your time. Our promise of delivery in under an hour ensures you never have to wait long for the products you need right away.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
              🌱
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Top Quality</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Handpicked fresh produce directly sourced from trusted suppliers and farms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Superfast processing and delivery to bring essentials to your door in under an hour.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
              💚
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We continuously strive to improve your shopping experience, one order at a time.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}