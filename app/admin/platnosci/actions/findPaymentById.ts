"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type PaymentWithUser = Prisma.PaymentGetPayload<{
  include: { user: true };
}>;

export const findPaymentById = async (paymentId: string) => {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("Nieautoryzowany");
  }

  const foundPayment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
    },
    include: {
      user: true,
    },
  });

  if (!foundPayment) return null;

  return foundPayment as PaymentWithUser;
};
