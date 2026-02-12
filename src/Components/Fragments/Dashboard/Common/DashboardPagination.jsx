import { memo } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/Elements/Shadcn/pagination";

const DashboardPagination = memo(({ pagination, onPageChange }) => {
  return (
    <Pagination className="">
      <PaginationContent className="bg-background">
        {pagination.prev_page ? (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(pagination.prev_page)} text="Sebelumnya" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationPrevious className="text-muted-foreground cursor-not-allowed" text="Sebelumnya" />
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

        {pagination.last_page !== pagination.current_page && pagination.last_page !== pagination.next_page && (
          <>
            <PaginationItem>
              <PaginationEllipsis className="text-muted-foreground cursor-default" />
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
            <PaginationNext className="text-muted-foreground cursor-not-allowed" text="Selanjutnya" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
});
export default DashboardPagination;
