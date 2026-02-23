import { memo } from "react";
import { Ellipsis } from "lucide-react";

import { TABLE_MENU_HEAD_COLUMNS } from "@/Constants/Dashboard/Menu/MenuConstant";
import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

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
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_MENU_HEAD_COLUMNS.length} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            menus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell className="truncate">{menu.name}</TableCell>
                <TableCell>{menu.category?.name ?? "Tidak ada Kategorgi"}</TableCell>
                <TableCell>{rupiah(menu.price)}</TableCell>
                <TableCell>
                  <Badge variant={menu.is_available ? "success" : "destructive"} className="capitalize">
                    {menu.is_available ? "Tersedia" : "Tidak Tersedia"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropDown
                    triggerIcon={Ellipsis}
                    buttonProps={{ variant: "ghost", size: "icon" }}
                    items={[
                      { key: "edit", label: "Edit", onClick: () => onOpenEditModal(menu) },
                      {
                        key: "delete",
                        label: "Hapus",
                        onClick: () => onOpenDeleteModal(menu),
                        className: "text-destructive hover:text-destructive/90! hover:bg-destructive/10!",
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
});

export default MenuTable;
