import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Package, Plus } from "lucide-react";

import { ROUTES } from "@/Constants/Common/RouteConstant";
import { SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS } from "@/Constants/Dashboard/Category/CategoryConstant";

import useAllCategory from "@/Hooks/Dashboard/Category/useAllCategory";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Select } from "@/Components/Elements/Inputs/Select";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import CategoryModalEdit from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalEdit";
import CategoryModalCreate from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalCreate";
import CategoryModalDelete from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalDelete";
import DashStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashStatisticCard";

const CategoryPage = () => {
  const { categories, loading, errorMessage, loadCategories, statistic } = useAllCategory();
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const [selectedCreateCategory, setSelectedCreateCategory] = useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);
  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  const showReset = !!(filters.sort_by || filters.sort_direction || search);

  useEffect(() => {
    loadCategories(filters);
  }, [filters, loadCategories]);

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value });
      }, 300);
    },
    [updateFilters],
  );

  const handleSortByChange = useCallback(
    (e) => {
      updateFilters({ sort_by: e });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e });
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleOpenDeleteModal = useCallback((categorySelected) => {
    setSelectedDeleteCategory(categorySelected);
  }, []);

  const handleOpenEditModal = useCallback((categorySelected) => {
    setSelectedEditCategory(categorySelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateCategory(state);
  }, []);

  return (
    <div className="bg-dashboard grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="space-y-4">
        <Button className="w-full">
          <Link to={ROUTES.DASHBOARD.INVENTORY.MENU} className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Kembali Ke Managemen Menu
          </Link>
        </Button>
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
          <div className="w-full flex justify-between gap-4">
            <Field>
              <Label htmlFor="sort-by">Berdasarkan</Label>
              <Select id="sort-by" name="sort-by" items={SORT_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} label="Berdasarkan" placeholder="Pilih Berdasarkan" />
            </Field>
            <Field>
              <Label htmlFor="sort-direction">Urutan</Label>
              <Select
                id="sort-direction"
                name="sort-direction"
                items={SORT_DIRECTION_OPTIONS}
                onValueChange={handleSortDirectionChange}
                value={filters.sort_direction || null}
                label="Urutan"
                placeholder="Pilih Urutan"
              />
            </Field>
          </div>
        </Card>

        <ButtonResetFilter onResetFilter={handleResetFilter} condition={showReset} />
      </div>

      <div className="col-span-2 space-y-4">
        <Card>
          <CategoryTable
            loading={loading}
            categories={categories}
            errorMessage={errorMessage}
            loadCategories={loadCategories}
            onOpenEditModal={handleOpenEditModal}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        </Card>
      </div>

      {selectedEditCategory && <CategoryModalEdit selectedCategory={selectedEditCategory} onOpenModal={handleOpenEditModal} />}
      {selectedCreateCategory && <CategoryModalCreate isOpen={selectedCreateCategory} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteCategory && <CategoryModalDelete selectedCategory={selectedDeleteCategory} onOpenModal={handleOpenDeleteModal} />}
    </div>
  );
};
export default CategoryPage;
