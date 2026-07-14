import { Search, ShoppingBag, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    desc: "Choose from thousands of fresh products across every category",
  },
  {
    icon: ShoppingBag,
    title: "Place Your Order",
    desc: "Add to cart, checkout in seconds with cash or online payment",
  },
  {
    icon: Truck,
    title: "Get It Delivered",
    desc: "Sit back and relax — your order arrives within the hour",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 md:px-8 mt-14">
      <div className="text-center mb-10">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900">
          How BazarDB Works
        </h2>
        <p className="text-gray-500 mt-2">Fresh groceries, delivered in three simple steps</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
        {steps.map((step, i) => (
          <div key={step.title} className="text-center relative">
            <div className="w-16 h-16 mx-auto bg-primary-light rounded-2xl flex items-center justify-center mb-4">
              <step.icon size={26} className="text-primary-dark" />
            </div>
            <h3 className="font-heading font-semibold text-gray-900 text-lg mb-1">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm max-w-[220px] mx-auto">{step.desc}</p>

            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t-2 border-dashed border-primary-light"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}