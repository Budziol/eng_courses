"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";
import { success } from "zod";

export type DeleteUserPaymentState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const deleteUserPayment = async (
  prevState: DeleteUserPaymentState,
  paymentId: string,
) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const deleted = await prisma.payment.delete({
    where: {
      id: paymentId,
    },
  });

  if (!deleted) {
    return {
      success: false,
      message:
        "Nie udalo się usunąć wybranej płatności. Spróbuj ponownie później.",
    };
  }

  updateTag(`payments-list`);

  return {
    success: true,
    message: "",
  };
};
