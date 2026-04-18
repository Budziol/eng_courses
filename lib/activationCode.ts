import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";

export function generateActivationCode() {
  const code = Math.floor(10000 + Math.random() * 90000).toString(); // 5 cyfr

  const codeHash = createHash("sha256").update(code).digest("hex");

  return { code, codeHash };
}

export function hashActivationCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

const CODE_EXPIRY = 1000 * 60 * 10; // 10 minut

export async function createActivationCode(userId: string) {
  const { code, codeHash } = generateActivationCode();

  const expiresAt = new Date(Date.now() + CODE_EXPIRY);

  await prisma.activationCode.upsert({
    where: { userId },
    update: {
      codeHash,
      expiresAt,
    },
    create: {
      userId,
      codeHash,
      expiresAt,
    },
  });

  return { code, expiresAt }; // ⚠️ tylko do maila
}
