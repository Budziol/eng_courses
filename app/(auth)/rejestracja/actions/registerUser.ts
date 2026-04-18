"use server";

import { createActivationCode } from "@/lib/activationCode";
import { sendMail } from "@/lib/mail/sendMail";
import { activationTemplate } from "@/lib/mail/templates/activation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/sessions";
import { registerSchema } from "@/lib/validators/register";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import z from "zod";

type RegisterErrors = {
  fieldErrors?: {
    name?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  formError?: string;
};

export async function registerUser(prevState: any, formData: FormData) {
  const redirectPath = formData.get("redirectPath") as string | null;

  const result = registerSchema.safeParse(Object.fromEntries(formData));

  try {
    if (!result.success) {
      const flat = z.flattenError(result.error);

      return {
        errors: {
          fieldErrors: flat.fieldErrors,
        } satisfies RegisterErrors,
      };
    }

    const { email, password, name, lastName } = result.data;

    const foundUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (foundUser) {
      return {
        errors: {
          formErrors: "Konto z podanym adresem email już istnieje",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        lastName: lastName,
        level: {
          create: {},
        },
      },
    });

    user.password = "";

    const { code } = await createActivationCode(user.id);

    const template = activationTemplate({ name, code });

    await sendMail({
      to: user.email,
      ...template,
    });

    await createSession(user.id);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        formErrors: "Rejestracja nie powiodła się. Spróbuj ponownie później.",
      },
    };
  }

  if (redirectPath) {
    redirect(`/aktywacja/${redirectPath}`);
  } else {
    redirect("/aktywacja");
  }
}
