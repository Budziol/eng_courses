"use client";

import { SecondaryButton } from "../Buttons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import MobilePagList from "./MobilePagList";
import PagList from "./PagList";

type Props = {
  totalPages: number;
  pageParam: number;
  onPageChange: (value: number) => void;
  isPending: boolean;
};

const Pagination = ({
  totalPages,
  pageParam,
  onPageChange,
  isPending,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-auto flex flex-col md:flex-row gap-4 md:gap-3 justify-center items-center">
      <SecondaryButton
        className="md:w-fit! px-3! rounded-lg! order-2 md:order-1"
        // disabled={isPending}
        onClick={() => onPageChange(pageParam - 1)}
      >
        <ChevronLeft size={18} />
      </SecondaryButton>

      <MobilePagList
        pages={pages}
        currentPage={pageParam}
        totalPages={totalPages}
        handleClick={onPageChange}
      />

      <PagList
        pages={pages}
        currentPage={pageParam}
        totalPages={totalPages}
        createPageURL={onPageChange}
      />

      <SecondaryButton
        className="md:w-fit! px-3! rounded-lg! order-1 md:order-3"
        // disabled={isPending}
        onClick={() => onPageChange(pageParam + 1)}
      >
        <ChevronRight size={18} />
      </SecondaryButton>
    </div>
  );
};
export default Pagination;
