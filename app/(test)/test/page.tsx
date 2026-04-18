import { getCurrentUser } from "@/app/(auth)/lib/auth";
import TestStart from "./components/test-start";
import TestScore from "./components/test-score";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const existingTest = await prisma.test.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (existingTest && !existingTest.score) {
    redirect(`/test/${existingTest.id}`);
  }

  if (existingTest && existingTest.score !== null) {
    return <TestScore score={existingTest.score} />;
  }

  return (
    <div className="bg-white border border-border rounded-lg shadow-xl">
      <TestStart />
    </div>
  );
};
export default page;
