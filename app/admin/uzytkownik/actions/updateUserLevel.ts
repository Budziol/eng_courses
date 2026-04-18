"use server";

import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { levelSchema } from "@/lib/validators/level";
import { meetingSchema } from "@/lib/validators/meeting";
import { updateTag } from "next/cache";
import z from "zod";

export type UpdateUserLevelState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export const updateUserLevel = async (
  prevState: UpdateUserLevelState,
  formData: FormData,
) => {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Nieautoryzowany");
  }

  const result = levelSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return {
      success: false,
      message: "",
      fieldErrors: errors.fieldErrors,
      formErrors: errors.formErrors,
    };
  }

  const targetLevelId = formData.get("levelId") as string;

  const { level, speaking, listening, reading, writing } = result.data;

  const updated = await prisma.level.update({
    where: { id: targetLevelId },
    data: {
      speaking: speaking,
      listening: listening,
      reading: reading,
      writing: writing,
      Level: level,
    },
  });

  if (!updated) {
    return {
      success: false,
      message:
        "Nie udalo się zaktualizować poziomu użytkownika. Spróbuj ponownie później.",
    };
  }

  updateTag(`level-${updated.userId}`);

  return { success: true, message: "" };
};
