import Banner from "@/components/Banner";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <Banner />
      <CategoryGrid />
    </main>
  );
}