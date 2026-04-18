import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import QuestionView from "./components/question-view";

type Props = {
  params: { id: string };
};

const page = async ({ params }: Props) => {
  const { id } = params;

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const test = await prisma.test.findFirst({
    where: { id },
  });

  if (!test || test.userId !== user.id) {
    redirect("/test");
  }

  const questions = await prisma.question.findMany({
    include: { options: true },
    orderBy: { createdAt: "asc" },
  });

  return <QuestionView testId={test.id} questions={questions} />;
};
export default page;
