import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import CountdownBadge from "./CountdownBadge";

export default async function DealsOfTheDay() {
  const dealProducts = await prisma.product.findMany({
    where: {
      discount: { gt: 0 },
    },
    orderBy: {
      discount: "desc",
    },
    take: 8,
  });

    if (dealProducts.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          🔥 Deals of the Day
        </h2>
        <CountdownBadge />
      </div>
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const interval = setInterval(() => {
      const diff = endOfDay.getTime() - Date.now();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ h, m, s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

export default function DealsOfTheDay() {
  const { h, m, s } = useCountdown();
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="px-4 md:px-8 mt-12">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-gray-900">
          🔥 Deals of the Day
        </h2>
        <div className="flex items-center gap-2 bg-gray-900 text-white text-sm font-mono px-3 py-1.5 rounded-full">
          <span>Ends in</span>
          <span className="font-bold">{pad(h)}:{pad(m)}:{pad(s)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}