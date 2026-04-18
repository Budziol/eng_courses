"use client";

import Pagination from "@/components/Pagination/Pagination";
import UsersTable from "./users-table";
import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import UserModal from "./user-modal";
import { UserWithPayments } from "../actions/getPaginatedUsers";

type Props = {
  data: UserWithPayments[];
  totalPages: number;
  pageParam: number;
  userId: string;
};

const UsersView = ({ data, totalPages, pageParam, userId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [isUserPending, startUserTransition] = useTransition();

  const handlePageChange = (page: number) => {
    if (page === 0 || page > totalPages) return;
    updateParams("page", page.toString());
  };

  const handleSearch = (query: string) => {
    updateParams("search", query, true);
  };

  const handleSelectUser = (userId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("userId", userId);

    setUserToLoad(userId);

    startUserTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const updateParams = (key: string, value: string, resetPage = false) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (resetPage) {
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const [userToLoad, setUserToLoad] = useState<string | null>(null);

  const selectedUser = data.find((u) => u.id === userId);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("userId");

    setUserToLoad(null);

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-xl relative overflow-auto mb-8">
        <div className="w-full flex gap-4 justify-between items-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <UsersTable
          isPending={isPending}
          data={data}
          onUserSelect={handleSelectUser}
          isUserPending={isUserPending}
          userToLoad={userToLoad}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        pageParam={pageParam}
        onPageChange={handlePageChange}
        isPending={isPending}
      />
      {selectedUser && !isPending && (
        <UserModal user={selectedUser} onClose={handleClose} />
      )}
    </>
  );
};
export default UsersView;
