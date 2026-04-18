import Link from "next/link";

const PaginationItem = ({
  text,
  currentPage,
  createPageURL,
}: {
  text: string;
  currentPage?: number;
  createPageURL?: (p: number) => void;
}) => {
  return (
    <button
      className={`group h-full px-2 rounded-lg flex items-center justify-center cursor-pointer ${currentPage === Number(text) ? "bg-main text-white" : "hover:bg-muted"}`}
      onClick={() => {
        createPageURL ? createPageURL(Number(text)) : 1;
      }}
    >
      <div
        className={`w-[24px] h-[24px] flex items-center justify-center text-sm ${currentPage === Number(text) ? "text-base" : "group-hover:text-main "}`}
      >
        {text}
      </div>
    </button>
  );
};
export default PaginationItem;
