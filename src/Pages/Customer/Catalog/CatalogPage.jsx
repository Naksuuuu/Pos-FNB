import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import CatalogCard from "@/Components/Fragments/Customer/Catalog/Card/CatalogCard";
import useAllCatalog from "@/Hooks/Customer/Catalog/useAllCatalog";

const ListCatalog = () => {
  const { catalogs, loadCatalogs, loading } = useAllCatalog();
  const navigate = useNavigate();
  const isOrderItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const totalPrice = useMemo(() => isOrderItems.reduce((acc, item) => acc + item.price, 0), [isOrderItems]);

  const handleCheckout = () => {
    navigate("/order");
  };

  const groupedCatalogs = useMemo(() => {
    if (catalogs.length === 0) return null;
    return Object.groupBy(catalogs, (catalog) => catalog.category.name);
  }, [catalogs]);

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  return (
    <>
      <main className="relative flex flex-col gap-4 items-center justify-center w-full min-h-screen px-3">
        <div className="w-full">
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
        {isOrderItems.length > 0 && (
          <>
            <div className="fixed bottom-3 left-0 right-0 z-999" onClick={handleCheckout}>
              <div className="w-[95%] max-w-3xl mx-auto bg-background h-16 rounded-md flex items-center overflow-hidden shadow-[0_-1px_10px_0.5px_rgba(0,0,0,0.4)]">
                <div className="p-4 relative">
                  <ShoppingBasket className="size-6" />
                  <Badge className="absolute top-0 right-1 rounded-full" size="icon" variant="destructive">
                    {isOrderItems.length}
                  </Badge>
                </div>
                <div className="bg-primary w-full h-full flex justify-between items-center text-background px-4 py-2">
                  <div className="flex flex-col">
                    <h3 className="">Total :</h3>
                    <h3 className="font-semibold">{rupiah(totalPrice)}</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold uppercase"> CheckOut ({isOrderItems.length})</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-16 mt-3"></div>
          </>
        )}
      </main>
    </>
  );
};

export default ListCatalog;
