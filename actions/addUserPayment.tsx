"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { paymentSchema } from "@/lib/validators/payment";
import { revalidateTag, updateTag } from "next/cache";
import z from "zod";

export type AddUserPaymentState = {
  success: boolean;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const addUserPayment = async (
  prevState: AddUserPaymentState,
  formData: FormData,
) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  console.log(formData);

  const result = paymentSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      fieldErrors: errors.fieldErrors,
      formErrors: errors.formErrors,
    };
  }

  const targetUserId = formData.get("userId") as string;

  const { paidAt, paidTo } = result.data;

  try {
    await prisma.payment.create({
      data: {
        userId: targetUserId,
        status: "PAID",
        paidAt: new Date(paidAt),
        paidTo: new Date(paidTo),
      },
    });

    updateTag(`payments-list`);

    return { success: true };
  } catch (error) {
    return { success: false, message: "Błąd bazy danych" };
  }
};
