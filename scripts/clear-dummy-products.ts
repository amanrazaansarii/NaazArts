import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking products in database...");
  const count = await prisma.product.count();
  console.log(`Current products in database: ${count}`);

  const deleteResult = await prisma.product.deleteMany({});
  console.log(`Successfully deleted ${deleteResult.count} dummy products.`);

  const remaining = await prisma.product.count();
  console.log(`Remaining products in database: ${remaining}`);
}

main()
  .catch((e) => {
    console.error("Error clearing products:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
