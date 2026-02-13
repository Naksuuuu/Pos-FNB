import { useCallback, useEffect, useRef, useState } from "react";

import useAllCategory from "@/Hooks/Category/useAllCategory";
import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import { Button } from "@/Components/Elements/Shadcn/button";
import CategoryEditModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryEditModal";
import CategoryCreateModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryCreateModal";
import CategoryDeleteModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryDeleteModal";
import { useSearchParams } from "react-router";

const DashboardCategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loading, errorMessage, loadCategories } = useAllCategory();
  const [selectedCreateCategory, setSelectedCreateCategory] = useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

  const search = searchParams.get("search") || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  useEffect(() => {
    const filters = {
      search,
    };
    loadCategories(filters);
  }, [loadCategories, search]);

  const updateUrlParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams();

      if (newParams.search) params.set("search", newParams.search);

      return setSearchParams(params);
    },
    [setSearchParams],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      const newParams = {
        search: e.target.value,
      };

      setOptimisticSearch(newParams.search);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateUrlParams(newParams);
      }, 300);
    },
    [updateUrlParams],
  );

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
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full gap-4">
          <DashboardInputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari menu..." />
          <Button onClick={handleOpenCreateModal}>Tambah Menu</Button>
        </div>
        <CategoryTable
          loading={loading}
          categories={categories}
          errorMessage={errorMessage}
          loadCategories={loadCategories}
          onOpenEditModal={handleOpenEditModal}
          onOpenDeleteModal={handleOpenDeleteModal}
        />
      </div>

      {selectedEditCategory && <CategoryEditModal selectedCategory={selectedEditCategory} onOpenModal={handleOpenEditModal} />}
      {selectedCreateCategory && <CategoryCreateModal isOpen={selectedCreateCategory} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteCategory && <CategoryDeleteModal selectedCategory={selectedDeleteCategory} onOpenModal={handleOpenDeleteModal} />}
    </div>
  );
};
export default DashboardCategoryPage;
