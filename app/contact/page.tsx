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