import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/Elements/Shadcn/Pagination/pagination";

const DashboardPagination = ({ pagination, onPageChange }) => {
  return (
    <Pagination className="justify-end!">
      <PaginationContent className="bg-background">
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(pagination.prev_page)} disabled={!pagination.prev_page} />
        </PaginationItem>

        {pagination.prev_page && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(pagination.prev_page)}>{pagination.prev_page}</PaginationLink>
          </PaginationItem>
        )}
        {pagination.current_page && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(pagination.current_page)}>{pagination.current_page}</PaginationLink>
          </PaginationItem>
        )}
        {pagination.next_page && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(pagination.next_page)}>{pagination.next_page}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(pagination.next_page)} disabled={!pagination.next_page} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default DashboardPagination;
