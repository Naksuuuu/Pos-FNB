import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Package, PlusCircle } from "lucide-react";

import { SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS } from "@/Constants/Dashboard/Category/CategoryConstant";

import useAllCategory from "@/Hooks/Dashboard/Category/useAllCategory";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import CategoryModalEdit from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalEdit";
import CategoryModalCreate from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalCreate";
import CategoryModalDelete from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalDelete";
import DashboardSelectFilter, { DashboardResetFilter } from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";
import DashboardStatisticCard from "@/Components/Fragments/Dashboard/Common/Card/DashboardStatisticCard";

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
    <div className="bg-dashboard grid grid-cols-3 gap-4">
      <div className="space-y-4">
        <Button className="w-full">
          <Link to="/dashboard/inventory/menu" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Kembali Ke Managemen Menu
          </Link>
        </Button>
        <Card>
          <DashboardStatisticCard title="Total Kategori" statistic={statistic?.total_category || 0} descriptions="Semua Kategori Terdaftar" icon={Package} />
        </Card>
        <Button onClick={handleOpenCreateModal} className="w-full">
          <PlusCircle /> Tambah Kategori
        </Button>
        <Card className="flex flex-col gap-4">
          <div>
            <h2 className="font-semibold ">Cari dan Filter</h2>
          </div>
          <div className="space-y-4">
            <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari kategori..." />
          </div>
          <div className="w-full flex justify-between gap-4">
            <DashboardSelectFilter items={SORT_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} label="Urutkan Berdasarkan" placeholder="Pilih opsi" />
            <DashboardSelectFilter items={SORT_DIRECTION_OPTIONS} onValueChange={handleSortDirectionChange} value={filters.sort_direction || null} label="Urutan" placeholder="Pilih urutan" />
          </div>
        </Card>

        <DashboardResetFilter onResetFilter={handleResetFilter} condition={showReset} />
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
