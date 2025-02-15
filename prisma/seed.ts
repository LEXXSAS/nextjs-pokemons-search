import { prisma } from './prisma-client';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        userEmail: 'asedov15@gmail.com',
        bookmarks: [],
        liked: []
      }
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
