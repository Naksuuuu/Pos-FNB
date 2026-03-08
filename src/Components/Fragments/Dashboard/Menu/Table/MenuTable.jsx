import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_MENU_HEAD_COLUMNS } from "@/Constants/Dashboard/Menu/MenuConstant";
import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";

import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const MenuTable = memo(({ loading, errorMessage, menus = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange, isChecked, handleAllCheckboxChange, handleCheckboxChange }) => {
  return (
    <>
      <Table className="min-w-full border-b">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox
                checked={isChecked.find((itm) => itm.page === pagination.current_page)?.idMenus.length === menus.length && menus.length > 0}
                onCheckedChange={() =>
                  handleAllCheckboxChange({
                    page: pagination.current_page,
                    idMenus: menus.map((menu) => menu.id),
                  })
                }
              />
            </TableHead>
            {TABLE_MENU_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_MENU_HEAD_COLUMNS.length + 1} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {menus.length < 1 && !loading && <DashTableError message="Tidak ada data menu" />}
          {!loading &&
            !errorMessage &&
            menus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell className="w-8">
                  <Checkbox
                    checked={isChecked.find((itm) => itm.page === pagination.current_page)?.idMenus.includes(menu.id) ?? false}
                    onCheckedChange={() =>
                      handleCheckboxChange({
                        page: pagination.current_page,
                        idMenus: [menu.id],
                      })
                    }
                  />
                </TableCell>
                <TableCell>{pagination.from + index}</TableCell>
                <TableCell className="truncate">{menu.name}</TableCell>
                <TableCell>{menu.category?.name ?? "Tidak ada Kategorgi"}</TableCell>
                <TableCell>{rupiah(menu.price)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={menu.is_available ? "success" : "destructive"} className="capitalize">
                    {menu.is_available ? "Tersedia" : "Tidak Tersedia"}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-center gap-2 text-center">
                  <Pen className="size-4 text-success" onClick={() => onOpenEditModal(menu)} />
                  <Trash className="size-4 text-destructive" onClick={() => onOpenDeleteModal(menu)} />
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
