import { useCallback, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/Constants/RouteConstant";
import { SORT_DIRECTION_OPTIONS } from "@/Constants/CommonConstant";
import { SORT_BY_OPTIONS } from "@/Features/Dashboard/CustomOption/Constants/CustomOptionConstant";
import useAllCustomOption from "@/Features/Dashboard/CustomOption/Hooks/useAllCustomOption";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Card } from "@/Components/Elements/Cards/Card";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Select } from "@/Components/Elements/Inputs/Select";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import CustomOptionTable from "@/Features/Dashboard/CustomOption/Components/Table/CustomOptionTable";
import CustomOptionStatistic from "@/Features/Dashboard/CustomOption/Components/Statistic/CustomOptionStatistic";
import CustomOptionModalCreate from "@/Features/Dashboard/CustomOption/Components/Modal/CustomOptionModalCreate";
import CustomOptionModalEdit from "@/Features/Dashboard/CustomOption/Components/Modal/CustomOptionModalEdit";
import CustomOptionModalDelete from "@/Features/Dashboard/CustomOption/Components/Modal/CustomOptionModalDelete";

const CustomOptionPage = () => {
  const {
    customOptions,
    loading,
    errorMessage,
    pagination,
    statistic,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleResetFilter,
    handlePerPageChange,
  } = useAllCustomOption();

  const [selectedCreateOption, setSelectedCreateOption] = useState(false);
  const [selectedEditOption, setSelectedEditOption] = useState(null);
  const [selectedDeleteOption, setSelectedDeleteOption] = useState(null);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateOption(state);
  }, []);

  const handleOpenEditModal = useCallback((item) => {
    setSelectedEditOption(item);
  }, []);

  const handleOpenDeleteModal = useCallback((item) => {
    setSelectedDeleteOption(item);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 bg-dashboard xl:grid-cols-3">
      <div className="space-y-4">
        <Button
          className="w-full"
          nativeButton={false}
          render={
            <Link to={ROUTES.DASHBOARD.INVENTORY.MENU} className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Kembali Ke Manajemen Menu
            </Link>
          }
        />

        <CustomOptionStatistic statistic={statistic} />

        <Button onClick={() => handleOpenCreateModal(true)} className="w-full">
          <Plus /> Tambah Opsi Kustom
        </Button>

        <Card className="space-y-4">
          <div>
            <h2 className="font-semibold">Cari dan Filter</h2>
          </div>
          <Field>
            <Label htmlFor="search">Cari Opsi Kustom</Label>
            <InputSearch
              id="search"
              name="search"
              onSearchChange={handleSearchChange}
              value={optimisticSearch}
              placeholder="Cari berdasarkan nama..."
            />
          </Field>

          <Field>
            <Label htmlFor="sort_by">Urutkan Berdasarkan</Label>
            <Select
              id="sort_by"
              name="sort_by"
              items={SORT_BY_OPTIONS}
              value={filters.sort_by || ""}
              placeholder="Pilih Urutan"
              onValueChange={handleSortByChange}
            />
          </Field>

          <Field>
            <Label htmlFor="sort_direction">Arah Urutan</Label>
            <Select
              id="sort_direction"
              name="sort_direction"
              items={SORT_DIRECTION_OPTIONS}
              value={filters.sort_direction || ""}
              placeholder="Pilih Arah Urutan"
              onValueChange={handleSortDirectionChange}
            />
          </Field>
        </Card>

        <ButtonResetFilter condition={showReset} onResetFilter={handleResetFilter} />
      </div>

      <div className="space-y-4 xl:col-span-2">
        <Card className="space-y-2 overflow-hidden">
          <CustomOptionTable
            customOptions={customOptions}
            loading={loading}
            errorMessage={errorMessage}
            onOpenEditModal={handleOpenEditModal}
            onOpenDeleteModal={handleOpenDeleteModal}
            pagination={pagination}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            filters={filters}
          />
        </Card>
      </div>

      {selectedCreateOption && (
        <CustomOptionModalCreate isOpen={selectedCreateOption} onOpenModal={handleOpenCreateModal} />
      )}
      {selectedEditOption && (
        <CustomOptionModalEdit selectedCustomOption={selectedEditOption} onOpenModal={handleOpenEditModal} />
      )}
      {selectedDeleteOption && (
        <CustomOptionModalDelete selectedCustomOption={selectedDeleteOption} onOpenModal={handleOpenDeleteModal} />
      )}
    </div>
  );
};

export default CustomOptionPage;
