import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const localAdapter = new PrismaPg({ connectionString: process.env.LOCAL_DATABASE_URL });
const remoteAdapter = new PrismaPg({ connectionString: process.env.REMOTE_DATABASE_URL });

const localDb = new PrismaClient({ adapter: localAdapter });
const remoteDb = new PrismaClient({ adapter: remoteAdapter });

async function main() {
  // Copy categories first (products depend on them)
  const categories = await localDb.category.findMany();
  for (const cat of categories) {
    await remoteDb.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
  }
  console.log(`✅ ${categories.length} categories copied`);

  // Copy products
  const products = await localDb.product.findMany();
  let copiedCount = 0;

  for (const p of products) {
    const localCategory = await localDb.category.findUnique({
      where: { id: p.categoryId },
    });

    if (!localCategory) continue;

    const remoteCategory = await remoteDb.category.findUnique({
      where: { slug: localCategory.slug },
    });

    if (!remoteCategory) continue;

    await remoteDb.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        price: p.price,
        discount: p.discount,
        imageUrl: p.imageUrl,
        stock: p.stock,
        categoryId: remoteCategory.id,
      },
      create: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        discount: p.discount,
        imageUrl: p.imageUrl,
        stock: p.stock,
        categoryId: remoteCategory.id,
      },
    });
    copiedCount++;
  }
  console.log(`✅ ${copiedCount} products copied`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await localDb.$disconnect();
    await remoteDb.$disconnect();
  });