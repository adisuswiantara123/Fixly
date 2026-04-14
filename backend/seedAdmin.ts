import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: './dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const existing = await prisma.user.findUnique({ where: { email: "admin@fixly.io" } });
  if (existing) {
    console.log("Admin user already exists!");
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@fixly.io",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Created Super Admin:", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
