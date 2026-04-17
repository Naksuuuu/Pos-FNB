import { memo, useCallback } from "react";

import useFilterParams from "@/Hooks/useFilterParams";

import { TableCell, TableRow } from "@/Components/Elements/Shadcn/table";
import { Button } from "@/Components/Elements/Shadcn/button";

const DashTableError = memo(({ message = "Cannot connect to the server" }) => {
  const { filters, resetFilters } = useFilterParams();

  const handleRetry = useCallback(() => {
    if (Object.keys(filters).length === 0 || !navigator.onLine) {
      window.location.reload();
      return;
    }

    resetFilters();
  }, [resetFilters, filters]);

  return (
    <TableRow>
      <TableCell colSpan={99}>
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-destructive h-125">
          <p>{message}</p>
          <Button className="ml-4" onClick={() => handleRetry()}>
            Muat Ulang
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

export default DashTableError;
