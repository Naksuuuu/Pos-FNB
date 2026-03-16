import { Fragment, memo, useCallback, useState } from "react";
import { Eye, Pen, Trash } from "lucide-react";
import { format } from "date-fns";

import { TABLE_MENU_HEAD_COLUMNS } from "@/Constants/Dashboard/Menu/MenuConstant";
import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Separator } from "@/Components/Elements/Shadcn/separator";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";

import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const MenuTable = memo(({ loading, errorMessage, menus = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange, isChecked, handleAllCheckboxChange, handleCheckboxChange }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleExpandedRow = useCallback((id) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  }, []);

  return (
    <>
      <Table className="min-w-full border-b">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2!">
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
              <Fragment key={menu.id}>
                <TableRow>
                  <TableCell className="p-2!">
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
                  <TableCell className="truncate w-2/7">
                    <p onClick={() => handleExpandedRow(menu.id)} className="w-full whitespace-normal cursor-pointer">
                      {menu.name}
                    </p>
                  </TableCell>
                  <TableCell>{menu.category?.name ?? "Tidak ada Kategorgi"}</TableCell>
                  <TableCell>{rupiah(menu.price)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={menu.is_available ? "success" : "destructive"} className="capitalize">
                      {menu.is_available ? "Tersedia" : "Tidak Tersedia"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-center gap-2 text-center">
                    <Pen className="cursor-pointer size-4 text-success" onClick={() => onOpenEditModal(menu)} />
                    <Trash className="cursor-pointer size-4 text-destructive" onClick={() => onOpenDeleteModal(menu)} />
                    <Eye className="text-black cursor-pointer size-4" onClick={() => handleExpandedRow(menu.id)} />
                  </TableCell>
                </TableRow>

                <TableRow className="w-full ">
                  <TableCell colSpan={TABLE_MENU_HEAD_COLUMNS.length + 1} className="relative p-0">
                    <div className={`grid transition-all duration-300 ease-out ${expandedRowId === menu.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden ">
                        <div className="flex justify-between gap-4 p-4">
                          <div className="w-1/4 aspect-video">
                            <ImageWithFallback src={menu.image_url} alt={menu.name} className="rounded-md" />
                          </div>

                          <Separator orientation="vertical" className="w-px " />
                          <div className="w-1/4 text-start">
                            <p className="font-medium text-foreground">Deskripsi :</p>
                            <p className="w-full whitespace-normal line-clamp-6">{menu.description ?? "Tidak ada deskripsi"}</p>
                          </div>

                          <Separator orientation="vertical" className="w-px " />
                          <div className="w-1/4 text-start">
                            <p className="font-medium text-foreground">Tanggal Dibuat :</p>
                            <p>{menu.created_at ? format(menu.created_at, "dd MMM yyyy HH:mm") : "Tidak ada tanggal dibuat"}</p>
                          </div>

                          <Separator orientation="vertical" className="w-px " />
                          <div className="w-1/4 text-start">
                            <p className="font-medium text-foreground">Terakhir Diperbaharui :</p>
                            <p>{menu.updated_at ? format(menu.updated_at, "dd MMM yyyy HH:mm") : "Tidak ada tanggal diperbaharui"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
});

export default MenuTable;
