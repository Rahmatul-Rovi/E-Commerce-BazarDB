import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

async function main() {
      // Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Fruits & Vegetables", slug: "fruits-vegetables" } }),
    prisma.category.create({ data: { name: "Meat & Fish", slug: "meat-fish" } }),
    prisma.category.create({ data: { name: "Cooking Essentials", slug: "cooking" } }),
    prisma.category.create({ data: { name: "Beverages", slug: "beverages" } }),
  ]);
   await prisma.product.createMany({
    data: [
      {
        name: "Fresh Red Apple (1kg)",
        slug: "fresh-red-apple",
        price: 250,
        discount: 10,
        imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400",
        stock: 20,
        categoryId: categories[0].id,
      },
      {
        name: "Fresh Banana (1 dozen)",
        slug: "fresh-banana",
        price: 120,
        discount: 20,
        imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400",
        stock: 25,
        categoryId: categories[0].id,
      },
      {
        name: "Broiler Chicken (1kg)",
        slug: "broiler-chicken",
        price: 200,
        discount: null,
        imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400",
        stock: 15,
        categoryId: categories[1].id,
      },
      {
        name: "Basmati Rice (5kg)",
        slug: "basmati-rice",
        price: 750,
        discount: 5,
        imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
        stock: 0,
        categoryId: categories[2].id,
      },
      {
        name: "Fresh Milk (1L)",
        slug: "fresh-milk",
        price: 90,
        discount: null,
        imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400",
        stock: 30,
        categoryId: categories[3].id,
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });