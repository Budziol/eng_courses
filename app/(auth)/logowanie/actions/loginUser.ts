"use server";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators/login";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/sessions";

type LoginErrors = {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
  formError?: string;
};

export async function login(prevState: any, formData: FormData) {
  const redirectPath = formData.get("redirectPath") as string | null;

  const result = loginSchema.safeParse(Object.fromEntries(formData));

  try {
    if (!result.success) {
      const flat = z.flattenError(result.error);

      return {
        errors: {
          fieldErrors: flat.fieldErrors,
        } satisfies LoginErrors,
      };
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        errors: {
          formErrors: "Błędny email lub hasło",
        },
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        errors: {
          formErrors: "Błędny email lub hasło",
        },
      };
    }

    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        formErrors: "Logowanie nie powiodło się. Spróbuj ponownie później.",
      },
    };
  }

  if (redirectPath) {
    redirect(redirectPath);
  } else {
    redirect("/panel");
  }
}
