import { Truck, Leaf, ShieldCheck, Headphones } from "lucide-react";

const badges = [
  { icon: Truck, title: "Fast Delivery", desc: "Within 1 hour" },
  { icon: Leaf, title: "Fresh Guarantee", desc: "Quality checked" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "Cash or online" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

export default function TrustBadges() {
  return (
    <section className="px-4 md:px-8 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface rounded-2xl p-5">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <badge.icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
              <p className="text-xs text-gray-500">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}