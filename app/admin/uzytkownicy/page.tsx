import DashboardHeader from "@/components/DashboardHeader";
import UsersWrapper from "./components/users-wrapper";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    userId?: string;
  }>;
};

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const search = params.search ?? "";
  const pageParam = Number(params.page ?? "1");
  const userId = params.userId ?? "";

  return (
    <>
      <div className="mb-8">
        <DashboardHeader
          heading="Użytkownicy"
          text="Zarządzaj zarejestrowanymi użytkownikami"
        />
      </div>
      <UsersWrapper userId={userId} search={search} pageParam={pageParam} />
    </>
  );
};
export default page;
