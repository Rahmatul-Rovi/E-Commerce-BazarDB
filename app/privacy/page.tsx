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