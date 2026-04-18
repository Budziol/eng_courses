"use server";

import { createActivationCode, hashActivationCode } from "@/lib/activationCode";
import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { sendMail } from "@/lib/mail/sendMail";
import { activationTemplate } from "@/lib/mail/templates/activation";
import { prisma } from "@/lib/prisma";
import { activationSchema } from "@/lib/validators/activation";
import { redirect } from "next/navigation";
import z from "zod";

export type checkCodeStatusState = {
  success?: boolean;
  time?: Date;
};

export async function checkCodeStatus(
  userId: string,
): Promise<checkCodeStatusState> {
  if (!userId) {
    throw new Error("Brak userId");
  }

  const foundCode = await prisma.activationCode.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!foundCode) {
    throw new Error("Nie znaleziono kodu dla tego użytkownika");
  }

  if (foundCode.expiresAt < new Date()) {
    return { success: false };
  }

  return { success: true, time: foundCode.expiresAt };
}

export type resetActivationCodeState = {
  success?: boolean;
  time?: Date;
};

export async function resetActivationCode(
  userId: string,
): Promise<resetActivationCodeState> {
  if (!userId) {
    throw new Error("Brak userId");
  }

  const foundCode = await prisma.activationCode.findUnique({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });

  if (!foundCode) {
    throw new Error("Nie znaleziono kodu dla tego użytkownika");
  }

  const { code, expiresAt } = await createActivationCode(userId);

  const template = activationTemplate({ name: foundCode.user.name, code });

  await sendMail({
    to: foundCode.user.email,
    ...template,
  });

  return { success: true, time: expiresAt };
}

export type sendActivationCodeState = {
  fieldErrors?: {
    code?: string[];
  };
  formError?: string;
  success?: boolean;
};

export async function sendActivationCode(
  prevState: sendActivationCodeState,
  formData: FormData,
): Promise<sendActivationCodeState> {
  const redirectPath = formData.get("redirectPath") as string | null;

  const result = activationSchema.safeParse(Object.fromEntries(formData));

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!result.success) {
    const flat = z.flattenError(result.error);

    return {
      fieldErrors: {
        code: flat.fieldErrors.code,
      },
    };
  }

  const { code } = result.data;

  const foundCode = await prisma.activationCode.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!foundCode) {
    throw new Error("Nie znaleziono kodu dla tego użytkownika");
  }

  if (hashActivationCode(code) !== foundCode.codeHash) {
    return { formError: "Kod jest nieprawidłowy." };
  }

  if (foundCode.expiresAt < new Date()) {
    return { formError: "Kod jest nieważny" };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        active: true,
      },
    }),

    prisma.activationCode.delete({
      where: {
        userId: user.id,
      },
    }),
  ]);

  if (redirectPath) {
    redirect(redirectPath);
  } else {
    redirect("/panel");
  }
}
