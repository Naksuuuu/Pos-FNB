import { memo } from "react";

import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { TableCell, TableRow } from "@/Components/Elements/Shadcn/table";

const DashboardTableLoading = memo(({ rows, columns }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => {
        return (
          <TableRow key={`skeleton-row-${r}`}>
            {Array.from({ length: columns }).map((_, c) => (
              <TableCell key={`skeleton-cell-${r}-${c}`}>
                <Skeleton className="w-full h-[36.8px]" />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
});

export default DashboardTableLoading;
