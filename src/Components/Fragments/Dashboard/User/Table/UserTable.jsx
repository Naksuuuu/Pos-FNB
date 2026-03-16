import { Fragment, memo, useCallback, useState } from "react";
import { Pen, Trash } from "lucide-react";
import { format } from "date-fns";

import { TABLE_USER_HEAD_COLUMNS } from "@/Constants/Dashboard/User/UserConstant";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";
import { Separator } from "@/Components/Elements/Shadcn/separator";

const UserTable = memo(({ loading, errorMessage, users = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange, isChecked, handleAllCheckboxChange, handleCheckboxChange }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleExpandedRow = useCallback((id) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  }, []);

  return (
    <>
      <Table className="min-w-full border-b">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2!">
              <Checkbox
                checked={isChecked.find((itm) => itm.page === pagination.current_page)?.idUsers.length === users.length && users.length > 0}
                onCheckedChange={() =>
                  handleAllCheckboxChange({
                    page: pagination.current_page,
                    idUsers: users.map((user) => user.id),
                  })
                }
              />
            </TableHead>
            {TABLE_USER_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_USER_HEAD_COLUMNS.length + 1} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {users.length < 1 && !loading && <DashTableError message="Tidak ada data user" />}
          {!loading &&
            !errorMessage &&
            users.map((user, index) => (
              <Fragment key={user.id}>
                <TableRow>
                  <TableCell className="px-2!">
                    <Checkbox
                      checked={isChecked.find((itm) => itm.page === pagination.current_page)?.idUsers.includes(user.id) ?? false}
                      onCheckedChange={() =>
                        handleCheckboxChange({
                          page: pagination.current_page,
                          idUsers: [user.id],
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{pagination?.from ? pagination.from + index : index + 1}</TableCell>
                  <TableCell className="w-2/6 truncate">
                    <p onClick={() => handleExpandedRow(user.id)} className="w-full whitespace-normal cursor-pointer">
                      {user.name}
                    </p>
                  </TableCell>
                  <TableCell className="w-1/6 truncate">
                    <p className="w-full whitespace-normal">{user.username}</p>
                  </TableCell>
                  <TableCell>{user.email ?? <span>-</span>}</TableCell>
                  <TableCell>{user.phone ?? <span>-</span>}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={user.role === "admin" ? "success" : "warning"} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center h-full gap-2 text-center">
                      <Pen className="size-4 cursor-pointer text-success hover:text-success/80!" onClick={() => onOpenEditModal(user)} />
                      <Trash className="size-4 cursor-pointer text-destructive hover:text-destructive/80!" onClick={() => onOpenDeleteModal(user)} />
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow className="w-full ">
                  <TableCell colSpan={TABLE_USER_HEAD_COLUMNS.length + 1} className="relative p-0">
                    <div className={`grid transition-all duration-300 ease-out ${expandedRowId === user.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden ">
                        <div className="flex justify-start gap-4 p-4">
                          <div className="w-1/2 text-start">
                            <p className="font-medium text-foreground">Tanggal Dibuat : {user.created_at ? format(user.created_at, "dd MMM yyyy HH:mm") : "Tidak ada tanggal dibuat"}</p>
                          </div>

                          <Separator orientation="vertical" className="w-px " />
                          <div className="w-1/2 text-start">
                            <p className="font-medium text-foreground">Terakhir Diperbaharui : {user.updated_at ? format(user.updated_at, "dd MMM yyyy HH:mm") : "Tidak ada tanggal diperbaharui"}</p>
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

      {pagination && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
    </>
  );
});

export default UserTable;
