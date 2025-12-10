import { PrismaClient } from "@prisma/client";

// Extend global type so TS understands `global.prisma`
declare global {
  // Allow global prisma to exist
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"], // optional, remove if you want
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
