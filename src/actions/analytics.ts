"use server";

import { prisma } from "@/lib/prisma";

export async function logPageVisit(path: string) {
  try {
    // Only log public paths, not admin paths
    if (!path.startsWith("/admin")) {
      await prisma.pageVisit.create({
        data: {
          path,
        },
      });
    }
  } catch (error) {
    console.error("Failed to log page visit", error);
  }
}
