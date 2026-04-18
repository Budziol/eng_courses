"use client";

import { SquarePen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  id: string;
};

const EditButton = ({ id }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("edit", id);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main h-10 w-10 cursor-pointer"
      onClick={handleClick}
    >
      <SquarePen size={18} />
    </button>
  );
};
export default EditButton;
