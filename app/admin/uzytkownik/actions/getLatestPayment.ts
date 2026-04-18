"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getLatestPayment = cache(async (userId: string) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  if (!userId) {
    throw new Error("Brak userId");
  }

  const latestPayment = await prisma.payment.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestPayment) {
    return null;
  }

  return latestPayment;
});
