import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Fruits & Vegetables", slug: "fruits-vegetables" } }),
    prisma.category.create({ data: { name: "Meat & Fish", slug: "meat-fish" } }),
    prisma.category.create({ data: { name: "Cooking Essentials", slug: "cooking" } }),
    prisma.category.create({ data: { name: "Beverages", slug: "beverages" } }),
    prisma.category.create({ data: { name: "Home & Cleaning", slug: "cleaning" } }),
    prisma.category.create({ data: { name: "Baby Care", slug: "babycare" } }),
    prisma.category.create({ data: { name: "Beauty Products", slug: "beauty" } }),
    prisma.category.create({ data: { name: "Pet Care", slug: "pet-care" } }),
  ]);

  // Products
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
      {
        name: "Dishwashing Liquid (500ml)",
        slug: "dishwashing-liquid",
        price: 130,
        discount: null,
        imageUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&q=80&w=400",
        stock: 18,
        categoryId: categories[4].id,
      },
      {
        name: "Floor Cleaner (1L)",
        slug: "floor-cleaner",
        price: 180,
        discount: 8,
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400",
        stock: 22,
        categoryId: categories[4].id,
      },
      {
        name: "Baby Diapers (Pack of 20)",
        slug: "baby-diapers",
        price: 650,
        discount: 10,
        imageUrl: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=400",
        stock: 12,
        categoryId: categories[5].id,
      },
      {
        name: "Baby Wipes (80 pcs)",
        slug: "baby-wipes",
        price: 220,
        discount: null,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
        stock: 30,
        categoryId: categories[5].id,
      },
      {
        name: "Moisturizing Lotion (200ml)",
        slug: "moisturizing-lotion",
        price: 350,
        discount: 15,
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
        stock: 16,
        categoryId: categories[6].id,
      },
      {
        name: "Herbal Shampoo (400ml)",
        slug: "herbal-shampoo",
        price: 280,
        discount: null,
        imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=400",
        stock: 20,
        categoryId: categories[6].id,
      },
      {
        name: "Dog Food (2kg)",
        slug: "dog-food",
        price: 800,
        discount: 5,
        imageUrl: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=400",
        stock: 14,
        categoryId: categories[7].id,
      },
      {
        name: "Cat Litter (5kg)",
        slug: "cat-litter",
        price: 450,
        discount: null,
        imageUrl: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&q=80&w=400",
        stock: 20,
        categoryId: categories[7].id,
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