"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Farhana Akter",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    text: "Delivery was super fast and the vegetables were really fresh. Ordering is so easy too.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Tanvir Hasan",
    location: "Gulshan, Dhaka",
    rating: 5,
    text: "I order groceries every week from here now. Prices are fair and quality is always good.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Nusrat Jahan",
    location: "Mirpur, Dhaka",
    rating: 4,
    text: "Great app experience, easy checkout, and the cash on delivery option is really convenient.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Rafiul Islam",
    location: "Uttara, Dhaka",
    rating: 5,
    text: "The fish and meat quality is always top notch. Delivery guys are polite and always on time.",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Sadia Rahman",
    location: "Banani, Dhaka",
    rating: 5,
    text: "Love how easy it is to reorder my usual items. Saves me so much time every week.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Imran Kabir",
    location: "Bashundhara, Dhaka",
    rating: 4,
    text: "Good variety of products and the discounts on the deals section are genuinely worth it.",
    avatar: "https://i.pravatar.cc/150?img=51",
  },
  {
    name: "Mahmuda Sultana",
    location: "Mohammadpur, Dhaka",
    rating: 5,
    text: "Customer support helped me quickly when I had an issue with an order. Really impressed.",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Shakil Ahmed",
    location: "Motijheel, Dhaka",
    rating: 5,
    text: "Packaging is always neat and nothing arrives damaged. My go-to place for groceries now.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Tania Ferdous",
    location: "Baridhara, Dhaka",
    rating: 4,
    text: "Prices are competitive compared to nearby shops and the app is very easy to navigate.",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    name: "Nayeem Chowdhury",
    location: "Khilgaon, Dhaka",
    rating: 5,
    text: "Been using this for three months straight. Never had a single delivery delay so far.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

export default function Testimonials() {
  return (
    <section className="px-4 md:px-8 mt-14">
      <div className="text-center mb-10">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-2">Trusted by thousands of happy shoppers</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="bg-surface rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < review.rating ? "text-accent" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center font-heading font-bold text-primary-dark text-sm">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}