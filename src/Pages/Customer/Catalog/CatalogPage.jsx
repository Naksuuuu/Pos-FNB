import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";
import useAllCatalog from "@/Hooks/Customer/Catalog/useAllCatalog";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import CatalogCard from "@/Components/Fragments/Customer/Catalog/Card/CatalogCard";

const ListCatalog = () => {
  const navigate = useNavigate();
  const { catalogs, loadCatalogs, loading, orderItems, totalPrice } = useAllCatalog();

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  const groupedCatalogs = useMemo(() => {
    if (catalogs.length === 0) return null;
    return Object.groupBy(catalogs, (catalog) => catalog.category.name);
  }, [catalogs]);

  const handleCheckout = useCallback(() => {
    navigate("/order");
  }, [navigate]);

  return (
    <div className="relative w-full px-3">
      <div className="">
        {!loading &&
          groupedCatalogs &&
          Object.entries(groupedCatalogs).map(([categoryName, catalogs]) => (
            <div key={categoryName} className="justify-center grid-cols-1">
              <div className="w-full mx-auto">
                <div className="flex items-center w-full gap-2 my-4">
                  <div className="font-bold uppercase">
                    <h2 className="text-2xl">{categoryName}</h2>
                  </div>
                  <div className="h-0.5 bg-gray-200 grow"></div>
                </div>
                <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {catalogs.map((catalog, index) => (
                    <CatalogCard key={index} catalog={catalog} />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      {orderItems.length > 0 && (
        <>
          <div className="fixed left-0 right-0 px-3 bottom-3 z-999" onClick={handleCheckout}>
            <div className="w-full max-w-3xl mx-auto bg-background h-16 rounded-md flex items-center overflow-hidden shadow-[0_-1px_10px_0.5px_rgba(0,0,0,0.4)]">
              <div className="relative p-4">
                <ShoppingBasket className="size-6" />
                <Badge className="absolute top-0 rounded-full right-1" size="icon" variant="destructive">
                  {orderItems.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between w-full h-full px-4 py-2 bg-primary text-background">
                <div className="flex flex-col">
                  <h3 className="">Total :</h3>
                  <h3 className="font-semibold">{rupiah(totalPrice)}</h3>
                </div>
                <div>
                  <h3 className="font-semibold uppercase"> CheckOut ({orderItems.length})</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-16 mt-3"></div>
        </>
      )}
    </div>
  );
};

export default ListCatalog;
