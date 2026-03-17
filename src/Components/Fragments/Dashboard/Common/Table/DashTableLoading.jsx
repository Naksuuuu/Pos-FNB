import { memo } from "react";

import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { TableCell, TableRow } from "@/Components/Elements/Shadcn/table";
import { Button } from "@/Components/Elements/Shadcn/button";

const DashTableLoading = memo(({ rows, columns, actionCountLoading = 1 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => {
        return (
          <TableRow key={`skeleton-row-${r}`}>
            {Array.from({ length: columns - 1 }).map((_, c) => (
              <TableCell key={`skeleton-cell-${r}-${c}`}>
                <Skeleton className="w-full h-8" />
              </TableCell>
            ))}
            <TableCell className="flex gap-2 text-center justify-center" key={`skeleton-cell-${r}-${columns}`}>
              {Array.from({ length: actionCountLoading }).map((_, a) => (
                <Button key={`skeleton-action-${r}-${a}`} size="icon" variant="outline" disabled>
                  <Skeleton className="size-full" />
                </Button>
              ))}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
});

export default DashTableLoading;
