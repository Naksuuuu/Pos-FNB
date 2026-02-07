import { Button } from "@/Components/Elements/Shadcn/Button/button";
import MenuCreateModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuCreateModal";
import MenuDeleteModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuDeleteModal";
import MenuEditModal from "@/Components/Fragments/Dashboard/Menu/Modal/MenuEditModal";
import MenuTable from "@/Components/Fragments/Dashboard/Menu/Table/MenuTable";
import useAllMenu from "@/Hooks/Menu/useAllMenu";
import React, { useCallback, useState } from "react";

const PanelMenu = () => {
  const { menus } = useAllMenu();
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

  const handleOpenAddModal = useCallback((state) => {
    setSelectedEditProduct(null);
    setSelectedDeleteProduct(null);
    setSelectedAddProduct(state);
  }, []);

  return (
    <div>
      <div>
        <div className="w-full flex justify-end">
          <Button className="mb-4" onClick={handleOpenAddModal}>
            Add New Menu
          </Button>
        </div>
        <MenuTable menus={menus} onOpenDeleteModal={handleOpenDeleteModal} onOpenEditModal={handleOpenEditModal} />
      </div>

      {selectedDeleteProduct && (
        <MenuDeleteModal selectedProduct={selectedDeleteProduct} onOpenModal={handleOpenDeleteModal} />
      )}
      {selectedEditProduct && <MenuEditModal selectedProduct={selectedEditProduct} onOpenModal={handleOpenEditModal} />}

      {selectedAddProduct && <MenuCreateModal isOpen={selectedAddProduct} onOpenModal={handleOpenAddModal} />}
    </div>
  );
};

export default PanelMenu;
