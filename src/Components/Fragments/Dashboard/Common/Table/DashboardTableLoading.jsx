import { memo } from "react";

import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { TableCell, TableRow } from "@/Components/Elements/Shadcn/table";

const DashboardTableLoading = memo(() => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="relative flex items-center justify-center">
          <Skeleton className="w-full h-125" />
          <Spinner className="absolute size-8" />
        </div>
      </TableCell>
    </TableRow>
  );
});

export default DashboardTableLoading;
