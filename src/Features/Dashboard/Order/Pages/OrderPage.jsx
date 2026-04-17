import { memo } from "react";
import { SORT_DATE_OPTIONS, STATUS_OPTIONS } from "@/Features/Dashboard/Order/Constants/OrderConstant";
import useAllOrder from "@/Features/Dashboard/Order/Hooks/useAllOrder";

import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Select } from "@/Components/Elements/Inputs/Select";
import { SelectDate } from "@/Components/Elements/Inputs/SelectDate";
import { Card } from "@/Components/Elements/Cards/Card";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Field } from "@/Components/Elements/Shadcn/field";

import OrderTable from "@/Features/Dashboard/Order/Components/Table/OrderTable";
import OrderStatistic from "@/Features/Dashboard/Order/Components/Statistic/OrderStatistic";

const OrderPage = memo(() => {
  const {
    orders,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    optimisticSearch,
    showReset,
    handlePageChange,
    handleStatusChange,
    handleSearchChange,
    handleResetFilter,
    handleSortDateChange,
    handlePerPageChange,
  } = useAllOrder();

  return (
    <>
      <OrderStatistic statistic={statistic} />

      <Card className="grid grid-cols-2 gap-4">
        <Field className="col-span-full">
          <Label htmlFor="search">Cari User</Label>
          <InputSearch id="search" name="search" placeholder="Cari berdasarkan nama pelanggan, order ID atau nomor meja" value={optimisticSearch} onSearchChange={handleSearchChange} />
        </Field>
        <Field>
          <Label htmlFor="status">Status</Label>
          <Select id="status" name="status" items={STATUS_OPTIONS} placeholder="Pilih Status" onValueChange={handleStatusChange} value={filters.status || null} />
        </Field>
        <Field>
          <Label htmlFor="date">Tanggal</Label>
          <SelectDate id="date" name="date" items={SORT_DATE_OPTIONS} placeholder="Pilih Tanggal" onValueChange={handleSortDateChange} value={filters.date_filter || null} />
        </Field>
      </Card>

      <ButtonResetFilter condition={showReset} onResetFilter={handleResetFilter} />

      <Card className="space-y-2 ">
        <OrderTable
          orders={orders}
          loading={loading}
          errorMessage={errorMessage}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePerPageChange={handlePerPageChange}
          filters={filters}
        />
      </Card>
    </>
  );
});

OrderPage.displayName = "OrderPage";

export default OrderPage;
