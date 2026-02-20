import { useCallback, useEffect, useRef, useState } from "react";

import useAllCategory from "@/Hooks/Dashboard/Category/useAllCategory";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import { Button } from "@/Components/Elements/Shadcn/button";
import CategoryModalEdit from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalEdit";
import CategoryModalCreate from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalCreate";
import CategoryModalDelete from "@/Components/Fragments/Dashboard/Category/Modal/CategoryModalDelete";
import { DashboardResetFilter } from "@/Components/Fragments/Dashboard/Common/DashboardSelectFilter";
import { Card } from "@/Components/Elements/Cards/Card";

const CategoryPage = () => {
  const { categories, loading, errorMessage, loadCategories } = useAllCategory();
  const { filters, updateFilters, resetFilters } = useFilterParams();

  const [selectedCreateCategory, setSelectedCreateCategory] = useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);
  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

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
    <>
      <Card>
        <div className="flex justify-between w-full gap-4">
          <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." />
          <Button onClick={handleOpenCreateModal}>Tambah Menu</Button>
        </div>
      </Card>

      <DashboardResetFilter onResetFilter={handleResetFilter} condition={search} />

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

      {selectedEditCategory && <CategoryModalEdit selectedCategory={selectedEditCategory} onOpenModal={handleOpenEditModal} />}
      {selectedCreateCategory && <CategoryModalCreate isOpen={selectedCreateCategory} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteCategory && <CategoryModalDelete selectedCategory={selectedDeleteCategory} onOpenModal={handleOpenDeleteModal} />}
    </>
  );
};
export default CategoryPage;
