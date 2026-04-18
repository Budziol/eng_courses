"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

// export type UserWithPaymentsAndLevel = Prisma.UserGetPayload<{
//   include: { payments: true; level: true };
// }>;

export const getUser = cache(async (userId: string) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  if (!userId) {
    throw new Error("Brak userId");
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    // include: {
    //   payments: {
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   },
    //   level: true,
    // },
  });

  if (!foundUser) {
    throw new Error("Brak usera o tym id");
  }

  return foundUser;
});
