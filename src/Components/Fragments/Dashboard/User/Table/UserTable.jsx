import { memo } from "react";
import { Ellipsis } from "lucide-react";

import { TABLE_USER_HEAD_COLUMNS } from "@/Constants/Dashboard/User/UserConstant";

import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const UserTable = memo(
  ({ loading, errorMessage, users = [], pagination, onOpenDeleteModal, onOpenEditModal, handlePageChange }) => {
    return (
      <>
        <Table className="min-w-full border-b">
          <TableHeader>
            <TableRow>
              {TABLE_USER_HEAD_COLUMNS.map((col) => (
                <TableHead key={col.header} className={`${col.width}`}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_USER_HEAD_COLUMNS.length} />}
            {errorMessage && !loading && <DashTableError message={errorMessage} />}
            {!loading &&
              !errorMessage &&
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{pagination?.from ? pagination.from + index : index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "success" : "warning"} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropDown
                      triggerIcon={Ellipsis}
                      buttonProps={{ variant: "ghost", size: "icon" }}
                      items={[
                        { key: "edit", label: "Edit", onClick: () => onOpenEditModal(user) },
                        {
                          key: "delete",
                          label: "Hapus",
                          onClick: () => onOpenDeleteModal(user),
                          className: "text-destructive hover:text-destructive! hover:bg-destructive/10! ",
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {pagination && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
      </>
    );
  },
);

export default UserTable;
