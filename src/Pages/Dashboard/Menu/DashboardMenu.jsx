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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/Elements/Shadcn/Input/select";

const SORY_BY_OPTIONS = [
  { label: "Tanggal Dibuat", value: "created_at" },
  { label: "Nama ", value: "name" },
  { label: "Harga ", value: "price" },
  { label: "Stok ", value: "stock" },
];

const SORT_DIRECTION_OPTIONS = [
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

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
  const sort_by = searchParams.get("sort_by") || "";

  useEffect(() => {
    const filters = {
      page,
      per_page,
      search,
      sort_by,
    };
    loadMenus(filters);
  }, [loadMenus, page, per_page, search, sort_by]);

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

      if (newParams.sort_by) {
        params.set("sort_by", newParams.sort_by);
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
        sort_by,
      });
    },
    [updateUrlParams, per_page, search, sort_by],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search: e.target.value,
        sort_by,
      };

      setOptimisticSearch(newParams.search);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateUrlParams(newParams);
      }, 300);
    },
    [updateUrlParams, per_page, sort_by],
  );

  const handleSortByChange = useCallback(
    (e) => {
      const newParams = {
        page: 1,
        per_page,
        search,
        sort_by: e,
      };

      updateUrlParams(newParams);
    },
    [updateUrlParams, per_page, search],
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
      <div className="grid grid-cols-2 gap-4 py-4 xl:grid-cols-4">
        <div className="w-full">
          <Select items={SORY_BY_OPTIONS} onValueChange={(e) => handleSortByChange(e)}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Pilih opsi" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>Cari Berdasarkan</SelectLabel>
                {SORY_BY_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Select items={SORT_DIRECTION_OPTIONS} defaultValue={SORT_DIRECTION_OPTIONS[0].value}>
            <SelectTrigger className="w-full ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>Urutan</SelectLabel>
                {SORT_DIRECTION_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Select items={SORY_BY_OPTIONS} defaultValue={SORY_BY_OPTIONS[0].value}>
            <SelectTrigger className="w-full ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>sorting</SelectLabel>
                {SORY_BY_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Select items={SORY_BY_OPTIONS} defaultValue={SORY_BY_OPTIONS[0].value}>
            <SelectTrigger className="w-full ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>sorting</SelectLabel>
                {SORY_BY_OPTIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full gap-4">
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
