import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import "dotenv/config";

// Always resolve dev.db from the project root (backend/)
const dbPath = path.join(__dirname, '..', '..', 'dev.db');
console.log('[Prisma] Connecting to database at:', dbPath);
const adapter = new PrismaBetterSqlite3({ url: dbPath });
export const prisma = new PrismaClient({ adapter });
