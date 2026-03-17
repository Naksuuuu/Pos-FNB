import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Package, Plus } from "lucide-react";

import { ROUTES } from "@/Constants/Common/RouteConstant";
import { SORT_BY_OPTIONS } from "@/Constants/Dashboard/Category/CategoryConstant";
import { SORT_DIRECTION_OPTIONS } from "@/Constants/Common/CommonConstant";

import useAllCategory from "@/Hooks/Dashboard/Category/useAllCategory";
import useCheckboxCategory from "@/Hooks/Dashboard/Category/useCheckboxCategory";

import { Select } from "@/Components/Elements/Inputs/Select";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import CategoryModalEdit from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalEdit";
import CategoryModalCreate from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalCreate";
import CategoryModalDelete from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalDelete";
import CategoryModalBulkDelete from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalBulkDelete";
import DashStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCard";

const CategoryPage = () => {
  const { categories, loading, errorMessage, statistic, filters, showReset, optimisticSearch, handleSearchChange, handleSortByChange, handleSortDirectionChange, handleResetFilter } = useAllCategory();

  const { isChecked, setIsChecked, handleCheckboxChange, handleAllCheckboxChange } = useCheckboxCategory();

  // coupling reset checkbox ketika melakukan filter atau reset filter
  const filtersKey = JSON.stringify(filters);
  useEffect(() => {
    setIsChecked([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  const [selectedCreateCategory, setSelectedCreateCategory] = useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);
  const [selectedBulkDeleteCategory, setSelectedBulkDeleteCategory] = useState(false);

  const handleOpenDeleteModal = useCallback((categorySelected) => {
    setSelectedDeleteCategory(categorySelected);
  }, []);

  const handleOpenEditModal = useCallback((categorySelected) => {
    setSelectedEditCategory(categorySelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateCategory(state);
  }, []);

  const handleOpenBulkDeleteModal = useCallback((state) => {
    setSelectedBulkDeleteCategory(state);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 bg-dashboard xl:grid-cols-3">
      <div className="space-y-4">
        <Button
          className="w-full"
          render={
            <Link to={ROUTES.DASHBOARD.INVENTORY.MENU} className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Kembali Ke Managemen Menu
            </Link>
          }
        ></Button>
        <Card className="space-y-4">
          <div>
            <h2 className="font-semibold ">Statistik Kategori</h2>
          </div>
          <DashStatisticCard title="Total Kategori" statistic={statistic?.total_category || 0} descriptions="Semua Kategori Terdaftar" icon={Package} />
        </Card>
        <Button onClick={handleOpenCreateModal} className="w-full">
          <Plus /> Tambah Kategori
        </Button>
        <Card className="flex flex-col gap-4">
          <div>
            <h2 className="font-semibold ">Cari dan Filter</h2>
          </div>
          <div className="space-y-4">
            <Field>
              <Label htmlFor="search">Cari Kategori</Label>
              <InputSearch id="search" name="search" onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari kategori..." />
            </Field>
          </div>
          <div className="flex justify-between w-full gap-4">
            <Field>
              <Label htmlFor="sort-by">Berdasarkan</Label>
              <Select id="sort-by" name="sort-by" items={SORT_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} placeholder="Pilih Berdasarkan" />
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
      </div>

      <div className="col-span-2 space-y-4">
        <div
          className={`grid grid-cols-5 justify-end gap-4 transition-all overflow-hidden h-fit duration-500 ease-out ${isChecked.length > 0 ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <Button variant="outline" onClick={() => setIsChecked([])}>
            Batal Pilih
          </Button>
          <Button variant="destructive" className="col-span-4" onClick={() => handleOpenBulkDeleteModal(true)}>
            Hapus {isChecked.length} Data Terpilih?
          </Button>
        </div>

        <Card>
          <CategoryTable
            loading={loading}
            categories={categories}
            errorMessage={errorMessage}
            onOpenEditModal={handleOpenEditModal}
            onOpenDeleteModal={handleOpenDeleteModal}
            isChecked={isChecked}
            handleAllCheckboxChange={handleAllCheckboxChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Card>
      </div>

      {selectedEditCategory && <CategoryModalEdit selectedCategory={selectedEditCategory} onOpenModal={handleOpenEditModal} />}
      {selectedCreateCategory && <CategoryModalCreate isOpen={selectedCreateCategory} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteCategory && <CategoryModalDelete selectedCategory={selectedDeleteCategory} onOpenModal={handleOpenDeleteModal} />}
      {selectedBulkDeleteCategory && <CategoryModalBulkDelete isOpen={selectedBulkDeleteCategory} onOpenModal={handleOpenBulkDeleteModal} items={isChecked} setIsChecked={setIsChecked} />}
    </div>
  );
};
export default CategoryPage;
