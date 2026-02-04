import ProductTable from "@/Components/Fragments/Dashboard/Product/Table/ProductTable";
import useAllMenu from "@/Hooks/Menu/useAllMenu";
import React from "react";

const PanelProduct = () => {
  const { menus } = useAllMenu();

  console.log("Menus in PanelProduct:", menus);

  return (
    <div>
      <ProductTable />
    </div>
  );
};

export default PanelProduct;
