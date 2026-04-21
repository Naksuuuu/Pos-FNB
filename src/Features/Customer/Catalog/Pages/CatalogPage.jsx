import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { toast } from "sonner";

import { ROUTES } from "@/Constants/RouteConstant";

import useAllCatalog from "@/Features/Customer/Catalog/Hooks/useAllCatalog";
import useAvailableCustomerTables from "@/Features/Customer/Catalog/Hooks/useAvailableCustomerTables";

import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Select } from "@/Components/Elements/Inputs/Select";
import CatalogCard from "@/Features/Customer/Catalog/Components/Card/CatalogCard";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalogs, loading, orderItems, totalPrice } = useAllCatalog();
  const { tables, loadingTables } = useAvailableCustomerTables();
  const tableCode = searchParams.get("code")?.trim() || "";
  const scanWarningShownRef = useRef(false);

  const tableOptions = useMemo(() => tables.map((table) => ({ label: table.code, value: table.code })), [tables]);

  const isScannedMode = Boolean(tableCode);
  const isSelectedTableValid = useMemo(() => (tableCode ? tables.some((table) => table.code === tableCode) : false), [tableCode, tables]);

  useEffect(() => {
    if (!isScannedMode || loadingTables || isSelectedTableValid || scanWarningShownRef.current) {
      return;
    }

    toast.warning("Meja tidak aktid atau Tidak tercatat");
    scanWarningShownRef.current = true;
  }, [isScannedMode, loadingTables, isSelectedTableValid]);

  useEffect(() => {
    if (!isScannedMode || loadingTables) {
      return;
    }

    if (isSelectedTableValid) {
      scanWarningShownRef.current = false;
    }
  }, [isScannedMode, isSelectedTableValid, loadingTables]);

  const handleTableChange = useCallback(
    (value) => {
      const nextParams = new URLSearchParams(searchParams);

      if (value) {
        nextParams.set("code", value);
      } else {
        nextParams.delete("code");
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  const groupedCatalogs = useMemo(() => {
    if (catalogs.length === 0) return null;
    return Object.groupBy(catalogs, (catalog) => catalog.category.name);
  }, [catalogs]);

  const handleCheckout = useCallback(() => {
    if (!isSelectedTableValid) {
      toast.warning("Pilih nomor meja terlebih dahulu");
      return;
    }

    navigate({
      pathname: ROUTES.PUBLIC.ORDER,
      search: tableCode ? `?code=${encodeURIComponent(tableCode)}` : "",
    });
  }, [isSelectedTableValid, navigate, tableCode]);

  return (
    <div className="relative w-full px-3">
      {isScannedMode && isSelectedTableValid && (
        <div className="w-full max-w-3xl p-3 mx-auto mt-3 mb-2 border rounded-md bg-primary/5 border-primary/20">
          <p className="text-sm">
            Nomor meja: <span className="font-semibold">{tableCode}</span>
          </p>
        </div>
      )}

      {(!isScannedMode || !isSelectedTableValid) && (
        <div className="w-full max-w-3xl p-3 mx-auto mt-3 mb-2 border rounded-md bg-background border-border space-y-2">
          <p className="text-sm font-medium">Pilih nomor meja</p>
          <Select
            id="customer-table-code"
            name="customer-table-code"
            items={tableOptions}
            placeholder={loadingTables ? "Memuat meja..." : "Pilih nomor meja"}
            value={isSelectedTableValid ? tableCode : null}
            onValueChange={handleTableChange}
          />
        </div>
      )}

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

export default CatalogPage;
