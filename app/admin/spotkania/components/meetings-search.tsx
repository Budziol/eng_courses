"use client";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MeetingsSearch = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState(
    searchParams.get("search")?.toString() ?? "",
  );
  const debounced = useDebounce(query, 500);

  function handleSearch(term: string | undefined) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    handleSearch(debounced);
  }, [debounced]);

  return (
    <div className="relative flex">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="py-[9px] pl-10"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};
export default MeetingsSearch;
