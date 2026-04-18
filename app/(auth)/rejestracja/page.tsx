import RegisterForm from "@/app/(auth)/rejestracja/components/RegisterForm";
import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { redirect } from "next/navigation";

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
        <h2 className="text-center text-2xl">Stwórz konto</h2>
        <p className="text-center text-sm">
          Zacznij sowją przygodę z angielskim już dziś.
        </p>
      </div>
      <RegisterForm redirectPath={redirectPath} />
    </div>
  );
};
export default page;
