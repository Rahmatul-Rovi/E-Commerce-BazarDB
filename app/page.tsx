import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <Banner />
      <CategoryGrid />
      <ProductGrid/>
    </main>
  );
}