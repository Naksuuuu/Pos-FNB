import { memo } from "react";
import { Pen, Trash } from "lucide-react";

import { TABLE_REWARD_HEAD_COLUMNS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Select } from "@/Components/Elements/Inputs/Select";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";
import { PER_PAGE_OPTIONS } from "@/Constants/CommonConstant";

import DashTableError from "@/Features/Dashboard/Shared/Component/Table/DashTableError";
import DashTableLoading from "@/Features/Dashboard/Shared/Component/Table/DashTableLoading";

const RewardTable = memo(({
  loading,
  errorMessage,
  rewards = [],
  onOpenDeleteModal,
  onOpenEditModal,
  isChecked,
  handleAllCheckboxChange,
  handleCheckboxChange,
  pagination,
  handlePageChange,
  handlePerPageChange,
  filters,
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8">
              <Checkbox
                checked={isChecked.length === rewards.length && rewards.length > 0}
                onCheckedChange={() => handleAllCheckboxChange(rewards.map((r) => r.id))}
              />
            </TableHead>
            {TABLE_REWARD_HEAD_COLUMNS.map((col) => (
              <TableHead key={col.header} className={`${col.width}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !errorMessage && (
            <DashTableLoading rows="15" columns={TABLE_REWARD_HEAD_COLUMNS.length + 1} actionCountLoading={2} />
          )}
          {errorMessage && !loading && <DashTableError message={errorMessage} />}
          {!loading && !errorMessage && rewards.length < 1 && <DashTableError message="Tidak ada data reward" />}
          {!loading &&
            !errorMessage &&
            rewards.map((reward, index) => (
              <TableRow key={reward.id}>
                <TableCell className="w-8">
                  <Checkbox
                    checked={isChecked.includes(reward.id)}
                    onCheckedChange={() => handleCheckboxChange(reward.id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-mono text-xs">{reward.code}</TableCell>
                <TableCell className="font-semibold">{reward.name}</TableCell>
                <TableCell>{reward.category}</TableCell>
                <TableCell className="text-center font-medium">{reward.point_cost}</TableCell>
                <TableCell className="text-center font-medium">{reward.stock}</TableCell>
                <TableCell className="text-center font-medium">
                  {reward.discount_percentage !== null && reward.discount_percentage !== undefined ? `${reward.discount_percentage}%` : "-"}
                </TableCell>
                <TableCell className="max-w-[250px] truncate text-muted-foreground">
                  {reward.description || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={reward.status === "ACTIVE" ? "success" : "destructive"}>
                    {reward.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2 text-center justify-center">
                  <div className="flex items-center justify-center h-full gap-2 text-center">
                    <Button variant="outline" onClick={() => onOpenEditModal(reward)}>
                      <Pen className="cursor-pointer size-4 text-success" />
                    </Button>
                    <Button variant="outline" onClick={() => onOpenDeleteModal(reward)}>
                      <Trash className="cursor-pointer size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center p-4 border-t gap-4">
        <div className="flex items-center gap-2">
          <p className="text-nowrap text-sm text-muted-foreground">Data per halaman</p>
          <Select
            id="per-page"
            name="per-page"
            items={PER_PAGE_OPTIONS}
            value={filters.per_page || 15}
            onValueChange={(value) => handlePerPageChange(Number(value))}
          />
        </div>
        <Pagination pagination={pagination} onPageChange={handlePageChange} align="end" />
      </div>
    </>
  );
});

export default RewardTable;
