"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function finishTest(
  testId: string,
  answers: { questionId: string; optionId: string }[],
) {
  await prisma.testAnswer.createMany({
    data: answers.map((a) => ({
      testId,
      questionId: a.questionId,
      optionId: a.optionId,
    })),
  });

  const userAnswers = await prisma.testAnswer.findMany({
    where: { testId },
    select: { optionId: true },
  });

  const correctCount = await prisma.option.count({
    where: {
      id: { in: userAnswers.map((a) => a.optionId) },
      isCorrect: true,
    },
  });

  await prisma.test.update({
    where: { id: testId },
    data: { score: correctCount },
  });

  redirect("/test");
}
