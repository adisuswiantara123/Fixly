import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

console.log("Creating adapter...");
const adapter = new PrismaBetterSqlite3({ url: './dev.db' });

console.log("Adapter keys:", Object.keys(adapter));
console.log("Instantiating PrismaClient...");

try {
  const prisma = new PrismaClient({ adapter } as any);
  console.log("Success!");
} catch (e) {
  console.error("FAILED INIT:", e);
}
