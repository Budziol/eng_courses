import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

type Props = {
  searchParams: Promise<{ redirectPath?: string }>;
};

const page = async ({ searchParams }: Props) => {
  const user = await getCurrentUser();
  const { redirectPath } = await searchParams;

  if (user) {
    redirect("/");
  }

  return (
    <div className="bg-white border border-border rounded-lg shadow-xl">
      <div className="flex flex-col gap-2 p-6">
        <h2 className="text-center text-2xl">Logowanie</h2>
        <p className="text-center text-sm">
          Wprowadź dane aby zalogować się do konta.
        </p>
      </div>
      <LoginForm redirectPath={redirectPath} />
    </div>
  );
};

export default page;
