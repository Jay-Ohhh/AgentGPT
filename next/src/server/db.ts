import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";
/**
 * @see https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient; };

export const prisma = globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;
