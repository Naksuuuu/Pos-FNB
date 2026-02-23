import { memo } from "react";

import { TableCell, TableRow } from "@/Components/Elements/Shadcn/table";
import { Button } from "@/Components/Elements/Shadcn/button";
import useFilterParams from "@/Hooks/Common/useFilterParams";

const DashTableError = memo(({ message = "Cannot connect to the server" }) => {
  const { resetFilters } = useFilterParams();

  return (
    <TableRow>
      <TableCell colSpan={99}>
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center text-destructive h-125">
          <p>{message}</p>
          <Button className="ml-4" onClick={() => resetFilters()}>
            Muat Ulang
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
});

export default DashTableError;
