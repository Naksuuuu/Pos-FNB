import { memo } from "react";
import { Pagination as PaginationMain, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/Elements/Shadcn/pagination";

const Pagination = memo(({ pagination, onPageChange, align = "center" }) => {
  return (
    <PaginationMain className={`justify-${align}`}>
      <PaginationContent className="bg-background">
        {pagination.prev_page ? (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(pagination.prev_page)} text="Sebelumnya" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationPrevious className="cursor-not-allowed text-muted-foreground" text="Sebelumnya" />
          </PaginationItem>
        )}

        {pagination.prev_page && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(pagination.prev_page)}>{pagination.prev_page}</PaginationLink>
          </PaginationItem>
        )}
        {pagination.current_page && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(pagination.current_page)} isActive={true}>
              {pagination.current_page}
            </PaginationLink>
          </PaginationItem>
        )}
        {pagination.next_page && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(pagination.next_page)}>{pagination.next_page}</PaginationLink>
          </PaginationItem>
        )}

        {pagination.last_page !== pagination.current_page && pagination.last_page !== pagination.next_page && pagination.next_page !== null && (
          <>
            <PaginationItem>
              <PaginationEllipsis className="cursor-default text-muted-foreground" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(pagination.last_page)}>{pagination.last_page}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {pagination.next_page ? (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(pagination.next_page)} text="Selanjutnya" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationNext className="cursor-not-allowed text-muted-foreground" text="Selanjutnya" />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationMain>
  );
});
export { Pagination };
