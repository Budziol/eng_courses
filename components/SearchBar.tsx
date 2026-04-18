"use client";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const searchParams = useSearchParams();
  const initial = searchParams.get("search") ?? "";
  const [query, setQuery] = useState(initial);
  const debounced = useDebounce(query, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onSearch(debounced);
  }, [debounced]);

  return (
    <div className="relative">
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Wyszukaj..."
        className=""
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};
export default SearchBar;
