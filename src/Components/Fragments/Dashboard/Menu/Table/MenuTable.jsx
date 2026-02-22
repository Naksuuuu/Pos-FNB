import { memo } from "react";
import { Ellipsis } from "lucide-react";

import { TABLE_MENU_HEAD_COLUMNS } from "@/Constants/Dashboard/Menu/MenuConstant";
import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import DashboardTableError from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableError";
import DashboardTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashboardTableLoading";
import DashboardPagination from "@/Components/Fragments/Dashboard/Common/DashboardPagination";

const MenuTable = memo(({ loading, errorMessage, menus = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange }) => {
  return (
    <>
      <Table className="min-w-full border-b">
        <TableHeader>
          <TableRow>
            {TABLE_MENU_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashboardTableLoading rows="15" columns={TABLE_MENU_HEAD_COLUMNS.length} />}
          {errorMessage && !loading && <DashboardTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            menus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell className="truncate">{menu.name}</TableCell>
                <TableCell>{menu.category?.name ?? "Tidak ada Kategorgi"}</TableCell>
                <TableCell>{rupiah(menu.price)}</TableCell>
                <TableCell>
                  {menu.is_available ? (
                    <Badge className="px-2 py-1 bg-emerald-100 text-emerald-600">Tersedia</Badge>
                  ) : (
                    <Badge variant="destructive" className="px-2 py-1 ">
                      Tidak Tersedia
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropDown
                    triggerIcon={Ellipsis}
                    buttonProps={{ variant: "ghost", size: "icon" }}
                    items={[
                      { key: "edit", label: "Edit", onClick: () => onOpenEditModal(menu) },
                      { key: "delete", label: "Hapus", onClick: () => onOpenDeleteModal(menu), className: "text-red-600 hover:text-red-700! hover:bg-red-100! " },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DashboardPagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
});

export default MenuTable;
