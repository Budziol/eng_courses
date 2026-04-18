"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { paymentSchema } from "@/lib/validators/payment";
import { revalidateTag, updateTag } from "next/cache";
import z from "zod";

export type UpdateUserPaymentState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const updateUserPayment = async (
  prevState: UpdateUserPaymentState,
  formData: FormData,
) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const result = paymentSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      message: "",
      fieldErrors: errors.fieldErrors,
      formErrors: errors.formErrors,
    };
  }

  const targetPaymentId = formData.get("paymentId") as string;

  const { paidAt, paidTo } = result.data;

  const updated = await prisma.payment.update({
    where: { id: targetPaymentId },
    data: { paidAt: paidAt, paidTo: paidTo },
  });

  if (!updated) {
    return {
      success: false,
      message:
        "Nie udalo się zaktualizować wybranej płatności. Spróbuj ponownie później.",
    };
  }

  updateTag(`payments-list`);
  updateTag("payments-all");

  return { success: true, message: "" };
};
