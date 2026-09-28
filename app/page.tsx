import AppPromo from "@/components/AppPromo";
import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import DealsOfTheDay from "@/components/DealsOfTheDay";
import ProductGrid from "@/components/ProductGrid";
import PromoStrip from "@/components/PromoStrip";
import TrustBadges from "@/components/TrustBadges";

// Shared wrapper style: even vertical gap between sections.
// The [&>section]:mt-0 part resets each component's own top margin,
// so this wrapper is the only thing controlling the spacing.
const sectionClass = "py-5 md:py-8 [&>section]:mt-0";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-25">
      <div data-aos="fade-in" className="pt-2 pb-5 md:pb-8 [&>section]:mt-0">
        <Banner />
      </div>

      <div data-aos="fade-up" className={sectionClass}>
        <CategoryGrid />
      </div>

      <div data-aos="fade-up" className={sectionClass}>
        <ProductGrid />
      </div>

      <div data-aos="zoom-in-up" className={sectionClass}>
        <TrustBadges />
      </div>

      <div data-aos="fade-up" className={sectionClass}>
        <DealsOfTheDay />
      </div>

      <div data-aos="fade-right" className={sectionClass}>
        <AppPromo />
      </div>

      <div data-aos="fade-left" className={sectionClass}>
        <PromoStrip />
      </div>
    </main>
  );
}