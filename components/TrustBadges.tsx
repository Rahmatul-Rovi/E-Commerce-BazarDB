import {
  Truck,
  Leaf,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Zap,
} from "lucide-react";

const trustFeatures = [
  {
    icon: Truck,
    title: "1-Hour Express Delivery",
    desc: "Guaranteed fastest doorstep delivery across Dhaka city within 60 minutes.",
    badge: "Super Fast",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    highlights: ["Live Order Tracking", "Under 60 Mins"],
  },
  {
    icon: Leaf,
    title: "100% Fresh & Organic",
    desc: "Directly sourced from verified local farms with strict quality inspection.",
    badge: "100% Guaranteed",
    gradient: "from-green-500 to-emerald-600",
    shadow: "shadow-green-500/20",
    highlights: ["Farm-to-Table", "Chemical Free"],
  },
  {
    icon: ShieldCheck,
    title: "Secure & Flexible Payments",
    desc: "Multiple payment options including Cash on Delivery, bKash, Nagad & Cards.",
    badge: "SSL Encrypted",
    gradient: "from-teal-500 to-cyan-600",
    shadow: "shadow-teal-500/20",
    highlights: ["COD Available", "Instant Refunds"],
  },
  {
    icon: Headphones,
    title: "24/7 Premium Support",
    desc: "Dedicated support team available round-the-clock for any query or assistance.",
    badge: "Always Active",
    gradient: "from-emerald-600 to-emerald-800",
    shadow: "shadow-emerald-600/20",
    highlights: ["Instant Reply", "Phone & Chat"],
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "99.8%", label: "On-Time Delivery" },
  { value: "100%", label: "Freshness Verified" },
  { value: "15-Min", label: "Avg Support Response" },
];

export default function TrustBadges() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 my-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Background Wrapper with Ambient Glow */}
        <div
          data-aos="fade-up"
          className="bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 rounded-3xl p-6 sm:p-10 md:p-12 border border-emerald-100/90 shadow-2xl shadow-emerald-950/5 relative overflow-hidden"
        >
          {/* Ambient Background Glow Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header Title Section */}
          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10" data-aos="fade-up">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-3 text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100/80 rounded-full">
              <Sparkles size={14} /> Why Choose BazarDB
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Grocery Shopping <span className="text-emerald-600">You Can Trust</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              We prioritize quality, speed, and security in every single order delivered to your home.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-12">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                  className="group bg-white rounded-2xl p-6 border border-gray-100/90 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon & Top Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shrink-0 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={26} />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                        {feature.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Feature Checklist Tags */}
                  <div className="pt-4 border-t border-gray-100/80 space-y-1.5">
                    {feature.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="relative z-10 bg-emerald-900 text-white rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-emerald-100/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}