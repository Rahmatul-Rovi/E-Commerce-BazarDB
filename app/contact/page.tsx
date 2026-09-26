"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Sparkles } from "lucide-react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulating form submission delay
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Message Sent Successfully!",
        text: "Thanks for reaching out! Our team will get back to you shortly.",
        showConfirmButton: false,
        timer: 2000,
        customClass: { popup: "rounded-2xl" },
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 via-white to-gray-50 min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100/80 rounded-full">
            <Sparkles size={14} /> Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Have a question about your order, feedback, or just want to say hi? Drop us a line and we&apos;ll respond as quickly as possible.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="text-emerald-600" size={22} />
                Contact Information
              </h2>