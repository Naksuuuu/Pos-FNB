import { memo } from "react";
import { Ellipsis } from "lucide-react";

import { TABLE_CATEGORY_HEAD_COLUMNS } from "@/Constants/Dashboard/Category/CategoryConstant";

import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import DashTableError from "@/Components/Fragments/Dashboard/Common/Table/DashTableError";
import DashTableLoading from "@/Components/Fragments/Dashboard/Common/Table/DashTableLoading";

const CategoryTable = memo(({ loading, errorMessage, categories = [], onOpenDeleteModal, onOpenEditModal }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_CATEGORY_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && <DashTableLoading rows="15" columns={TABLE_CATEGORY_HEAD_COLUMNS.length} />}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading &&
            !errorMessage &&
            categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.menu_count}</TableCell>
                <TableCell className="text-right">
                  <DropDown
                    triggerIcon={Ellipsis}
                    buttonProps={{ variant: "ghost", size: "icon" }}
                    items={[
                      { key: "edit", label: "Edit", onClick: () => onOpenEditModal(category) },
                      {
                        key: "delete",
                        label: "Hapus",
                        onClick: () => onOpenDeleteModal(category),
                        className: "text-red-600 hover:text-red-700! hover:bg-red-100! ",
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
});

export default CategoryTable;
