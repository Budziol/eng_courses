import PaginationItem from "./pagination-item";

const MobilePagList = ({
  pages,
  currentPage,
  totalPages,
  handleClick,
}: {
  pages: number[];
  currentPage: number;
  totalPages: number;
  handleClick?: (value: number) => void;
}) => {
  return (
    <div className="order-3 w-full flex md:hidden items-center justify-between bg-white rounded-lg border border-border shadow-xl h-[44]">
      {pages.map((pageNum) => {
        if (totalPages <= 7) {
          return (
            <PaginationItem
              key={pageNum}
              createPageURL={handleClick}
              currentPage={currentPage}
              text={pageNum.toString()}
            />
          );
        }

        if (currentPage <= 2 || currentPage >= totalPages - 1) {
          if (pageNum === 0) {
            return null;
          }

          if (pageNum < 3) {
            return (
              <PaginationItem
                key={pageNum}
                createPageURL={handleClick}
                currentPage={currentPage}
                text={pageNum.toString()}
              />
            );
          }

          if (pageNum === 3) {
            return <PaginationItem key={`esssa`} text={"..."} />;
          }

          if (pageNum >= totalPages - 1) {
            return (
              <PaginationItem
                key={pageNum}
                createPageURL={handleClick}
                currentPage={currentPage}
                text={pageNum.toString()}
              />
            );
          }

          return null;
        }

        if (pageNum === 0) {
          return null;
        }

        if (pageNum === 1 || pageNum === totalPages) {
          return (
            <PaginationItem
              key={pageNum}
              createPageURL={handleClick}
              currentPage={currentPage}
              text={pageNum.toString()}
            />
          );
        }

        if (pageNum === 2) {
          return (
            <>
              <PaginationItem key={`essa`} text={"..."} />
              {currentPage > 1 && currentPage < 4 && (
                <PaginationItem
                  key={pageNum}
                  createPageURL={handleClick}
                  currentPage={currentPage}
                  text={pageNum.toString()}
                />
              )}
            </>
          );
        }

        if (pageNum === totalPages - 1) {
          return (
            <>
              {currentPage > totalPages - 4 && (
                <PaginationItem
                  key={pageNum}
                  createPageURL={handleClick}
                  currentPage={currentPage}
                  text={pageNum.toString()}
                />
              )}
              <PaginationItem key={`esa`} text={"..."} />
            </>
          );
        }

        if (pageNum >= currentPage - 1 && pageNum <= currentPage + 1) {
          return (
            <PaginationItem
              key={pageNum}
              createPageURL={handleClick}
              currentPage={currentPage}
              text={pageNum.toString()}
            />
          );
        }

        return null;
      })}
    </div>
  );
};
export default MobilePagList;
