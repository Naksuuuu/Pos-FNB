import { useCallback, useState } from "react";

import useAllCategory from "@/Hooks/Category/useAllCategory";
import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import { Button } from "@/Components/Elements/Shadcn/button";
import CategoryEditModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryEditModal";

const DashboardCategoryPage = () => {
  const { categories, loading, errorMessage, loadCategories } = useAllCategory();
  const [selectedCreateCategory, setSelectedCreateCategory] = useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

  const handleOpenDeleteModal = useCallback((categorySelected) => {
    setSelectedEditCategory(null);
    setSelectedDeleteCategory(categorySelected);
  }, []);

  const handleOpenEditModal = useCallback((categorySelected) => {
    setSelectedDeleteCategory(null);
    setSelectedEditCategory(categorySelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedEditCategory(null);
    setSelectedDeleteCategory(null);
    setSelectedCreateCategory(state);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full gap-4">
          <DashboardInputSearch onSearchChange={(e) => console.log(e)} value={"haha"} placeholder="Cari menu..." />
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
    </div>
  );
};
export default DashboardCategoryPage;
