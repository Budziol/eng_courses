import { getCurrentUser } from "@/app/(auth)/lib/auth";
import { getAllMeetingsPages } from "@/app/admin/spotkania/actions/getAllMeetignsPages";
import Table from "@/app/admin/spotkania/components/meetings-table";
import DashboardHeader from "@/components/DashboardHeader";
import Loader from "@/components/Loaders/Loader";
import NewPagination from "@/components/Pagination/new-pagination";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ page: number }>;
};

const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = params?.page || 1;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  const { totalPages } = await getAllMeetingsPages(user.id);

  return (
    <div className="flex flex-col max-w-[1440px] mx-auto px-4 py-6 h-full space-y-12">
      <div className="">
        <DashboardHeader heading="Spotkania" text="Wszystkie spotkania" />
      </div>
      <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
        <Suspense key={page} fallback={<Loader />}>
          <Table page={page} search={user.id} limit={10} />
        </Suspense>
      </div>
      {totalPages > 1 && <NewPagination totalPages={totalPages} />}
    </div>
  );
};
export default page;
