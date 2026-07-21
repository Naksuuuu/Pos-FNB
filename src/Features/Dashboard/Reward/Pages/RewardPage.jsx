import { useCallback, useEffect, useState } from "react";
import { Gift, Plus } from "lucide-react";

import { SORT_DIRECTION_OPTIONS } from "@/Constants/CommonConstant";
import { SORT_BY_OPTIONS, CATEGORY_OPTIONS, STATUS_OPTIONS } from "@/Features/Dashboard/Reward/Constants/RewardConstant";

import useAllReward from "@/Features/Dashboard/Reward/Hooks/useAllReward";
import useCheckboxReward from "@/Features/Dashboard/Reward/Hooks/useCheckboxReward";

import { Select } from "@/Components/Elements/Inputs/Select";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";

import RewardTable from "@/Features/Dashboard/Reward/Components/Table/RewardTable";
import RewardModalEdit from "@/Features/Dashboard/Reward/Components/Modal/RewardModalEdit";
import RewardModalCreate from "@/Features/Dashboard/Reward/Components/Modal/RewardModalCreate";
import RewardModalDelete from "@/Features/Dashboard/Reward/Components/Modal/RewardModalDelete";
import RewardModalBulkDelete from "@/Features/Dashboard/Reward/Components/Modal/RewardModalBulkDelete";
import RewardStatistic from "@/Features/Dashboard/Reward/Components/Statistic/RewardStatistic";

const filterCategories = [
  { label: "Semua Kategori", value: "" },
  ...CATEGORY_OPTIONS,
];

const filterStatuses = [
  { label: "Semua Status", value: "" },
  ...STATUS_OPTIONS,
];

const RewardPage = () => {
  const {
    rewards,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleCategoryChange,
    handleStatusChange,
    handlePageChange,
    handlePerPageChange,
    handleResetFilter,
  } = useAllReward();

  const { isChecked, setIsChecked, handleCheckboxChange, handleAllCheckboxChange } = useCheckboxReward();

  const filtersKey = JSON.stringify(filters);
  useEffect(() => {
    setIsChecked([]);
  }, [filtersKey, setIsChecked]);

  const [selectedCreateReward, setSelectedCreateReward] = useState(null);
  const [selectedEditReward, setSelectedEditReward] = useState(null);
  const [selectedDeleteReward, setSelectedDeleteReward] = useState(null);
  const [selectedBulkDeleteReward, setSelectedBulkDeleteReward] = useState(false);

  const handleOpenDeleteModal = useCallback((rewardSelected) => {
    setSelectedDeleteReward(rewardSelected);
  }, []);

  const handleOpenEditModal = useCallback((rewardSelected) => {
    setSelectedEditReward(rewardSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateReward(state);
  }, []);

  const handleOpenBulkDeleteModal = useCallback((state) => {
    setSelectedBulkDeleteReward(state);
  }, []);

  return (
    <>
      <RewardStatistic statistic={statistic} />

      {/* Filter Card */}
      <Card className="space-y-4">
        <div className="grid items-end grid-cols-2 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Field>
              <Label htmlFor="search">Cari Reward</Label>
              <InputSearch
                id="search"
                name="search"
                onSearchChange={handleSearchChange}
                value={optimisticSearch}
                placeholder="Cari reward..."
              />
            </Field>
          </div>
          <Button onClick={() => handleOpenCreateModal(true)}>
            <Plus /> Tambah Reward
          </Button>
        </div>

        <div className="grid items-end grid-cols-2 gap-4 md:grid-cols-4">
          <Field>
            <Label htmlFor="filter-category">Kategori</Label>
            <Select
              id="filter-category"
              name="filter-category"
              items={filterCategories}
              onValueChange={handleCategoryChange}
              value={filters.category || null}
              placeholder="Pilih Kategori"
            />
          </Field>

          <Field>
            <Label htmlFor="filter-status">Status</Label>
            <Select
              id="filter-status"
              name="filter-status"
              items={filterStatuses}
              onValueChange={handleStatusChange}
              value={filters.status || null}
              placeholder="Pilih Status"
            />
          </Field>

          <Field>
            <Label htmlFor="sort-by">Berdasarkan</Label>
            <Select
              id="sort-by"
              name="sort-by"
              items={SORT_BY_OPTIONS}
              onValueChange={handleSortByChange}
              value={filters.sort_by || null}
              placeholder="Pilih Berdasarkan"
            />
          </Field>

          <Field>
            <Label htmlFor="sort-direction">Urutan</Label>
            <Select
              id="sort-direction"
              name="sort-direction"
              items={SORT_DIRECTION_OPTIONS}
              onValueChange={handleSortDirectionChange}
              value={filters.sort_direction || null}
              placeholder="Pilih Urutan"
            />
          </Field>
        </div>
      </Card>

      <ButtonResetFilter onResetFilter={handleResetFilter} condition={showReset} />

      {/* Bulk actions bar */}
      <div
        className={`grid grid-cols-5 w-full justify-end gap-4 transition-all overflow-hidden h-fit duration-500 ease-out ${
          isChecked.length > 0 ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <Button variant="outline" onClick={() => setIsChecked([])}>
          Batal Pilih
        </Button>
        <Button variant="destructive" className="col-span-4" onClick={() => handleOpenBulkDeleteModal(true)}>
          Hapus {isChecked.length} Data Terpilih?
        </Button>
      </div>

      {/* Table Card */}
      <Card className="flex flex-col gap-4 overflow-hidden">
        <RewardTable
          loading={loading}
          rewards={rewards}
          errorMessage={errorMessage}
          onOpenEditModal={handleOpenEditModal}
          onOpenDeleteModal={handleOpenDeleteModal}
          isChecked={isChecked}
          handleAllCheckboxChange={handleAllCheckboxChange}
          handleCheckboxChange={handleCheckboxChange}
          pagination={pagination}
          handlePageChange={handlePageChange}
          handlePerPageChange={handlePerPageChange}
          filters={filters}
        />
      </Card>

      {/* Modals */}
      {selectedEditReward && <RewardModalEdit selectedReward={selectedEditReward} onOpenModal={handleOpenEditModal} />}
      {selectedCreateReward && <RewardModalCreate isOpen={selectedCreateReward} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteReward && <RewardModalDelete selectedReward={selectedDeleteReward} onOpenModal={handleOpenDeleteModal} />}
      {selectedBulkDeleteReward && (
        <RewardModalBulkDelete
          isOpen={selectedBulkDeleteReward}
          onOpenModal={handleOpenBulkDeleteModal}
          items={isChecked}
          setIsChecked={setIsChecked}
        />
      )}
    </>
  );
};

export default RewardPage;
