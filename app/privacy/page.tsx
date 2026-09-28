import React from 'react';
import { ShieldCheck, Lock, UserCheck, Eye, Mail, Sparkles } from "lucide-react";

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 via-white to-gray-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100/80 rounded-full">
            <ShieldCheck size={14} /> Trust & Transparency
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Last updated: <span className="font-semibold text-gray-700">{currentYear}</span> • BazarDB Privacy Team
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl shadow-gray-100/80 space-y-8">
          
          {/* Section 1: Information We Collect */}
          <section className="flex gap-4 sm:gap-6 items-start">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0 shadow-sm hidden sm:flex">
              <UserCheck size={24} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 sm:block">
                <UserCheck size={20} className="text-emerald-600 sm:hidden" />
                Information We Collect
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We collect information you provide directly, such as your name, email address, phone number, and delivery address when you create an account or place an order.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2: How We Use Your Information */}
          <section className="flex gap-4 sm:gap-6 items-start">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0 shadow-sm hidden sm:flex">
              <Eye size={24} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 sm:block">
                <Eye size={20} className="text-emerald-600 sm:hidden" />
                How We Use Your Information
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Your information is used strictly to process orders, deliver fresh groceries to your doorstep, provide customer support, and continuously improve our service quality. <span className="font-semibold text-gray-800">We do not sell or lease your personal data to third parties.</span>
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3: Data Security */}
          <section className="flex gap-4 sm:gap-6 items-start">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0 shadow-sm hidden sm:flex">
              <Lock size={24} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 sm:block">
                <Lock size={20} className="text-emerald-600 sm:hidden" />
                Data Security
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                We take industry-standard measures to protect your data, including encrypted passwords, secure payment processing, and database protection protocols. While no internet transmission is 100% immune, we work continuously to keep your information safe.
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4: Contact Us */}
          <section className="flex gap-4 sm:gap-6 items-start">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0 shadow-sm hidden sm:flex">
              <Mail size={24} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 sm:block">
                <Mail size={20} className="text-emerald-600 sm:hidden" />
                Contact Us About Privacy
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please reach out to our privacy support team.
              </p>
            </div>
          </section>

        </div>

        {/* Bottom CTA Card */}
        <div className="mt-10 p-6 rounded-3xl bg-emerald-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-emerald-600/20 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have privacy questions?</h3>
            <p className="text-xs sm:text-sm text-emerald-100">Our customer support team is always ready to assist you.</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-6 py-3 rounded-2xl hover:bg-emerald-50 transition text-sm shrink-0 shadow-sm"
          >
            <Sparkles size={16} />
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}