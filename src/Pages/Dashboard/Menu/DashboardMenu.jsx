import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import useAllMenu from "@/Hooks/Menu/useAllMenu";

import { Button } from "@/Components/Elements/Shadcn/Button/button";
import MenuCreateModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuCreateModal";
import MenuDeleteModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuDeleteModal";
import MenuEditModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuEditModal";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import DashboardPagination from "@/Components/Fragments/Dashboard/Common/DashboardPagination";
import DashboardSearch from "@/Components/Fragments/Dashboard/Common/DashboardSearch";

const DashboardMenu = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { menus, loadMenus, loading, errorMessage, pagination } = useAllMenu();
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [selectedAddProduct, setSelectedAddProduct] = useState(false);

  const page = parseInt(searchParams.get("page") || pagination.current_page || 1);

  const per_page = searchParams.get("per_page") || pagination.per_page;
  const search = searchParams.get("search") || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  useEffect(() => {
    const filters = {
      page,
      per_page,
      search,
    };
    loadMenus(filters);
  }, [loadMenus, page, per_page, search]);

  const updateUrlParams = useCallback(
    (newParams) => {
      const params = new URLSearchParams();
      params.set("page", newParams.page);

      if (newParams.per_page) {
        params.set("per_page", newParams.per_page);
      }
      if (newParams.search) {
        params.set("search", newParams.search);
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
        search,
      });
    },
    [updateUrlParams, per_page, search],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
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
    [updateUrlParams, per_page],
  );

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
        <div className="flex justify-between gap-4 w-full">
          <DashboardSearch onSearchChange={(e) => handleSearchChange(e)} value={optimisticSearch} placeholder="Cari menu..." />
          <Button onClick={handleOpenCreateModal}>Tambah Menu</Button>
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
