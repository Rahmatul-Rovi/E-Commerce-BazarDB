import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import TrustBadges from "@/components/TrustBadges";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <Banner />
      <CategoryGrid />
      <ProductGrid/>
      <TrustBadges />
    </main>
  );
}