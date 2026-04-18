"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SecondaryButton } from "../Buttons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MobilePagList from "./MobilePagList";
import PagList from "./PagList";
import { SecondaryLink } from "../Links";

type Props = {
  totalPages: number;
  paramKey?: string;
};

const NewPagination = ({ totalPages, paramKey = "page" }: Props) => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const currentPage = Number(searchParams.get(paramKey)) || 1;

  // const createPageURL = (pageNumber: number) => {
  //   const params = new URLSearchParams(searchParams);

  //   if (pageNumber <= 1) {
  //     params.delete(paramKey);
  //   } else {
  //     params.set(paramKey, pageNumber.toString());
  //   }

  //   return `${pathname}?${params.toString()}`;
  // };

  const router = useRouter();
  const params = useSearchParams();
  const currentPage = Number(params.get(paramKey)) || 1;

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(params);

    newParams.set(paramKey, String(newPage));

    router.replace(`?${newParams.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-auto flex flex-col md:flex-row gap-4 md:gap-3 justify-center items-center">
      <SecondaryButton
        className="order-2 md:order-1 md:w-fit! px-3! rounded-lg!"
        onClick={() => changePage(Number(currentPage) - 1)}
      >
        <ChevronLeft size={18} />
      </SecondaryButton>

      <MobilePagList
        pages={pages}
        currentPage={currentPage}
        totalPages={totalPages}
        handleClick={changePage}
      />

      <PagList
        createPageURL={changePage}
        pages={pages}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <SecondaryButton
        className="order-1 md:order-3 md:w-fit! px-3! rounded-lg!"
        onClick={() => changePage(Number(currentPage) + 1)}
      >
        <ChevronRight size={18} />
      </SecondaryButton>
    </div>
  );
};
export default NewPagination;
