import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import DealsOfTheDay from "@/components/DealsOfTheDay";
import ProductGrid from "@/components/ProductGrid";
import PromoStrip from "@/components/PromoStrip";
import TrustBadges from "@/components/TrustBadges";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <Banner />
      <CategoryGrid />
      <ProductGrid/>
      <TrustBadges />
      <DealsOfTheDay/>
      <PromoStrip/>
    </main>
  );
}