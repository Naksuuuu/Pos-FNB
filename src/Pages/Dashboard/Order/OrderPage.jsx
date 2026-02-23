import { useCallback, useEffect, useRef, useState } from "react";

import { STATUS_OPTIONS } from "@/Constants/Dashboard/Order/OrderConstant";
import useFilterParams from "@/Hooks/Common/useFilterParams";
import useAllOrder from "@/Hooks/Dashboard/Order/useAllOrder";

import { Card } from "@/Components/Elements/Cards/Card";
import { Select } from "@/Components/Elements/Inputs/Select";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { SelectDate } from "@/Components/Elements/Inputs/SelectDate";

import OrderTable from "@/Components/Fragments/Dashboard/Order/Table/OrderTable";

const OrderPage = () => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const { orders, loadOrders, errorMessage, loading, pagination } = useAllOrder();

  const search = filters.search || "";
  const tanggal = filters.tanggal || null;

  const [optimisticSearch, setOptimisticSearch] = useState(search);
  const [date, setDate] = useState(tanggal);
  const showReset = !!(filters.status || search || tanggal);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  useEffect(() => {
    setDate(tanggal);
  }, [tanggal]);

  useEffect(() => {
    loadOrders(filters);
  }, [loadOrders, filters]);

  const handlePageChange = useCallback(
    (newPage) => {
      updateFilters({ page: newPage });
    },
    [updateFilters],
  );

  const handleStatusChange = useCallback(
    (value) => {
      updateFilters({ status: value });
    },
    [updateFilters],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value });
      }, 500);
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleDateChange = useCallback(
    (date) => {
      if (date) {
        setDate(date);
        updateFilters({ tanggal: date });
        return;
      }
      setDate(null);
      updateFilters({ tanggal: null });
    },
    [updateFilters],
  );

  return (
    <>
      <Card className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <InputSearch placeholder="Cari berdasarkan nama pelanggan, order ID atau nomor meja" value={optimisticSearch} onSearchChange={handleSearchChange} />
        </div>
        <Select items={STATUS_OPTIONS} label="Status" placeholder="pilih status" onValueChange={handleStatusChange} value={filters.status || ""} />
        <SelectDate date={date} onSelect={handleDateChange} />
      </Card>

      <ButtonResetFilter condition={showReset} onResetFilter={handleResetFilter} />

      <Card className="space-y-2 ">
        <OrderTable orders={orders} loading={loading} errorMessage={errorMessage} pagination={pagination} onOpenDeleteModal={() => {}} onOpenEditModal={() => {}} handlePageChange={handlePageChange} />
      </Card>
    </>
  );
};
export default OrderPage;
