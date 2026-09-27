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