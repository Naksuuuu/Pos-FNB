import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import useAllMenu from "@/Hooks/Menu/useAllMenu";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import MenuCreateModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuCreateModal";
import MenuDeleteModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuDeleteModal";
import MenuEditModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuEditModal";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import DashboardPagination from "@/Components/Fragments/Dashboard/Common/Pagination/DashboardPagination";

const DashboardMenu = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { menus, loadMenus, loading, errorMessage, pagination } = useAllMenu();

  const page = parseInt(searchParams.get("page") || pagination.current_page || 1);

  const per_page = searchParams.get("per_page") || pagination.per_page;

  useEffect(() => {
    const filters = {
      page,
      per_page,
    };
    loadMenus(filters);
  }, [loadMenus, page, per_page]);

  const updateUrlParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams();
      params.set("page", newParams.page);

      if (newParams.per_page) {
        params.set("per_page", newParams.per_page);
      }

      return setSearchParams(params);
    },
    [setSearchParams],
  );

  const handlePageChange = useCallback(
    (newPage) => {
      updateUrlParams({
        page: newPage,
        per_page,
      });
    },
    [updateUrlParams, per_page],
  );

  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [selectedAddProduct, setSelectedAddProduct] = useState(false);

  const handleOpenDeleteModal = useCallback((productSelected) => {
    setSelectedEditProduct(null);
    setSelectedDeleteProduct(productSelected);
  }, []);

  const handleOpenEditModal = useCallback((productSelected) => {
    setSelectedDeleteProduct(null);
    setSelectedEditProduct(productSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedEditProduct(null);
    setSelectedDeleteProduct(null);
    setSelectedAddProduct(state);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end w-full">
          <Button onClick={handleOpenCreateModal}>Add New Menu</Button>
        </div>
        <MenuTable
          loading={loading}
          errorMessage={errorMessage}
          menus={menus}
          pagination={pagination}
          loadMenus={loadMenus}
          onOpenDeleteModal={handleOpenDeleteModal}
          onOpenEditModal={handleOpenEditModal}
        />

        <DashboardPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>

      {selectedDeleteProduct && <MenuDeleteModal selectedProduct={selectedDeleteProduct} onOpenModal={handleOpenDeleteModal} />}
      {selectedEditProduct && <MenuEditModal selectedProduct={selectedEditProduct} onOpenModal={handleOpenEditModal} />}

      {selectedAddProduct && <MenuCreateModal isOpen={selectedAddProduct} onOpenModal={handleOpenCreateModal} />}
    </div>
  );
});

export default DashboardMenu;
