import { Truck, Leaf, ShieldCheck, Headphones } from "lucide-react";

const badges = [
  { icon: Truck, title: "Fast Delivery", desc: "Within 1 hour" },
  { icon: Leaf, title: "Fresh Guarantee", desc: "Quality checked" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "Cash or online" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

export default function TrustBadges() {
  return (
    <section className="px-4 md:px-8 mt-14 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-surface rounded-2xl p-8 border border-gray-100 shadow-md">
        {badges.map((badge) => (
          <div 
            key={badge.title} 
            className="flex items-center gap-5 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 group"
          >
           
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-50 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <badge.icon size={26} className="text-primary" />
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-gray-900 tracking-wide md:text-lg">
                {badge.title}
              </h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {badge.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}