import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_USER_HEAD_COLUMNS } from "@/Constants/Dashboard/User/UserConstant";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const UserTable = memo(({ loading, errorMessage, users = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange, isChecked, handleAllCheckboxChange, handleCheckboxChange }) => {
  return (
    <>
      <Table className="min-w-full border-b">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
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
              <TableRow key={user.id}>
                <TableCell className="w-8">
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email ?? <span>-</span>}</TableCell>
                <TableCell>{user.phone ?? <span>-</span>}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={user.role === "admin" ? "success" : "warning"} className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-center flex items-center justify-center gap-2">
                  <Pen className="size-4 cursor-pointer text-success hover:text-success/80!" onClick={() => onOpenEditModal(user)} />
                  <Trash className="size-4 cursor-pointer text-destructive hover:text-destructive/80!" onClick={() => onOpenDeleteModal(user)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {pagination && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
    </>
  );
});

export default UserTable;
