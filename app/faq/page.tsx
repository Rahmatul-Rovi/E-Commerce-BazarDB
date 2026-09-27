আপনার FAQPage কোডটিকে একটি প্রিমিয়াম, ক্লাসি এবং আই-ক্যাচিং (Eye-catching) একর্ডিয়ন ডিজাইনে রূপান্তর করে দেওয়া হলো।

এতে স্মুথ অ্যানিমেশন, অ্যাক্টিভ কাস্টম বর্ডার, ক্যাটাগরি সাপোর্ট কার্ডস এবং সার্চ/হেল্প বার যোগ করা হয়েছে যা আপনার BazarDB ই-কমার্স ওয়েবসাইটকে আরও প্রফেশনাল লুক দেবে।

আপডেট করা FAQPage কোড:
TypeScript
"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, Search } from "lucide-react";

const faqs = [
  {
    question: "How fast is delivery?",
    answer: "We aim to deliver most orders within 60 minutes, depending on your location in Dhaka and product availability.",
    category: "Delivery",
  },
  {
    question: "What payment methods do you accept?",
    answer: "Currently, we support Cash on Delivery (COD) and bKash/Nagad digital payments. Card payment options are coming soon!",
    category: "Payment",
  },
  {
    question: "Can I cancel or change my order?",
    answer: "Yes, you can request changes or cancellation by calling our support helpline before the order is dispatched for delivery.",
    category: "Orders",
  },
  {
    question: "Do you deliver outside Dhaka?",
    answer: "We are currently operating exclusively within Dhaka city to ensure under 1-hour delivery. Expansion to other divisions is planned soon.",
    category: "Delivery",
  },
  {
    question: "What if an item is out of stock?",
    answer: "Out-of-stock items are clearly marked on the product page. You can hit 'Notify Me' to get alerted when the item is back in stock.",
    category: "Products",
  },
  {
    question: "What is your return policy for fresh items?",
    answer: "If you receive damaged or stale fresh produce, you can return it directly to the delivery person or claim a refund via support within 2 hours.",
    category: "Returns",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 via-white to-gray-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-3 text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100/80 rounded-full">
            <Sparkles size={14} /> Help Center
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Have questions about delivery, payments, or orders? We&apos;ve got answers for you right here.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200/80 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition"
          />
        </div>