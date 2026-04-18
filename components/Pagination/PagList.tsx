import PaginationItem from "./pagination-item";

const PagList = ({
  pages,
  currentPage,
  totalPages,
  createPageURL,
}: {
  pages: number[];
  currentPage: number;
  totalPages: number;
  createPageURL: (value: number) => void;
}) => {
  return (
    <div className="hidden md:order-2 md:flex items-center gap-3 bg-white rounded-lg border border-border shadow-xl h-[44]">
      {pages.map((pageNum) => {
        if (totalPages < 9) {
          return (
            <PaginationItem
              key={pageNum}
              currentPage={currentPage}
              text={pageNum.toString()}
              createPageURL={createPageURL}
            />
          );
        }

        if (currentPage < 4 || currentPage > totalPages - 3) {
          if (pageNum === 0) {
            return null;
          }

          if (pageNum < 5) {
            return (
              <PaginationItem
                key={pageNum}
                currentPage={currentPage}
                text={pageNum.toString()}
                createPageURL={createPageURL}
              />
            );
          }

          if (pageNum === 5) {
            return <PaginationItem key={`esssa`} text={"..."} />;
          }

          if (pageNum >= totalPages - 3) {
            return (
              <PaginationItem
                key={pageNum}
                currentPage={currentPage}
                text={pageNum.toString()}
                createPageURL={createPageURL}
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
              currentPage={currentPage}
              text={pageNum.toString()}
              createPageURL={createPageURL}
            />
          );
        }

        if (pageNum === 2) {
          return (
            <>
              <PaginationItem key={`essa`} text={"..."} />
              {currentPage > 2 && currentPage < 5 && (
                <PaginationItem
                  key={pageNum}
                  currentPage={currentPage}
                  text={pageNum.toString()}
                  createPageURL={createPageURL}
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
                  currentPage={currentPage}
                  text={pageNum.toString()}
                  createPageURL={createPageURL}
                />
              )}
              <PaginationItem key={`esa`} text={"..."} />
            </>
          );
        }

        if (pageNum >= currentPage - 2 && pageNum <= currentPage + 2) {
          return (
            <PaginationItem
              key={pageNum}
              currentPage={currentPage}
              text={pageNum.toString()}
              createPageURL={createPageURL}
            />
          );
        }

        return null;
      })}
    </div>
  );
};
export default PagList;
