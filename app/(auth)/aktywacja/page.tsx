import { checkCodeStatus } from "@/app/(auth)/aktywacja/actions/activationCode";
import Activation from "@/app/(auth)/aktywacja/components/Activation";
import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ redirectPath?: string }>;
};

const page = async ({ searchParams }: Props) => {
  const user = await getCurrentUser();

  const { redirectPath } = await searchParams;

  if (!user) {
    redirect("/logowanie");
  }

  if (user.active) {
    redirect("/panel");
  }

  const codeStatus = await checkCodeStatus(user.id);

  return (
    <div className="bg-white border border-border rounded-lg shadow-xl">
      <div className="flex flex-col gap-2 p-6">
        <h2 className="text-center text-2xl">Aktywacja</h2>
      </div>
      <Activation
        userId={user.id}
        codeStatus={codeStatus}
        redirectPath={redirectPath}
      />
    </div>
  );
};
export default page;
