import { useCallback, useState } from "react";

import useAllCategory from "@/Hooks/Category/useAllCategory";
import CategoryTable from "@/Components/Fragments/Dashboard/Category/Table/CategoryTable";
import DashboardInputSearch from "@/Components/Fragments/Dashboard/Common/DashboardInputSearch";
import { Button } from "@/Components/Elements/Shadcn/button";
import CategoryEditModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryEditModal";
import CategoryCreateModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryCreateModal";
import CategoryDeleteModal from "@/Components/Fragments/Dashboard/Category/Modal/CategoryDeleteModal";

const DashboardCategoryPage = () => {
  const { categories, loading, errorMessage, loadCategories } = useAllCategory();
  const [selectedCreateCategory, setSelectedCreateCategory] = useState(null);
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(null);

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
      {selectedCreateCategory && <CategoryCreateModal isOpen={selectedCreateCategory} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteCategory && <CategoryDeleteModal selectedCategory={selectedDeleteCategory} onOpenModal={handleOpenDeleteModal} />}
    </div>
  );
};
export default DashboardCategoryPage;
