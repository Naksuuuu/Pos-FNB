import { Clock3, Menu, ShoppingBasket } from "lucide-react";
import { Link } from "react-router";

import useAllCatalog from "@/Features/Customer/Catalog/Hooks/useAllCatalog";

import { ROUTES } from "@/Constants/RouteConstant";

import { rupiah } from "@/Utils/rupiahHelper";

import CatalogCard from "@/Features/Customer/Catalog/Components/Card/CatalogCard";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Select } from "@/Components/Elements/Inputs/Select";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";

const CatalogPage = () => {
  const {
    loading,
    orderItems,
    totalPrice,
    groupedCatalogs,
    categoryNames,
    tenant,
    loadingTenant,
    tenantName,
    openingTime,
    closingTime,
    tableOptions,
    loadingTables,
    tableCode,
    isScannedMode,
    isSelectedTableValid,
    handleTableChange,
    handleCheckout,
    scrollToCategory,
    registerSectionRef,
  } = useAllCatalog();

  return (
    <div className="relative self-stretch w-full">
      <Card
        outerClassName="border border-border  rounded-b-md rounded-t-none shadow-none mb-3"
        className="p-0 md:p-0 max-h-[50vh] flex items-center justify-center w-full overflow-hidden  bg-input/20 aspect-video"
      >
        <ImageWithFallback
          src={tenant?.logo_url}
          alt={tenantName}
          className="object-cover object-center w-full h-full"
        />

        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            nativeButton={false}
            render={(props) => (
              <Link
                {...props}
                to={`${ROUTES.PUBLIC.USER}${tableCode ? `?code=${encodeURIComponent(tableCode)}` : ""}`}
              />
            )}
          >
            <Menu />
          </Button>
        </div>
      </Card>

      <div className="px-3 mb-3">
        <div className="w-full mb-4 space-y-3">
          <Card outerClassName="border rounded-md shadow-none">
            {loadingTenant ? (
              <div className="space-y-2 animate-pulse">
                <div className="w-2/3 h-6 rounded-md bg-muted" />
                <div className="w-1/2 h-5 rounded-md bg-muted" />
              </div>
            ) : (
              <div className="space-y-2">
                <h1 className="text-xl font-extrabold leading-tight text-primary">{tenantName}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-4" />
                  <span>
                    {tenant?.is_operational ? (
                      "Buka hari ini"
                    ) : (
                      <span className="text-destructive">Tutup hari ini</span>
                    )}{" "}
                    {tenant?.is_operational && `, ${openingTime}-${closingTime}`}
                  </span>
                </div>
              </div>
            )}
          </Card>

          {tenant?.is_operational === false && (
            <Card
              outerClassName="border border-destructive/20 rounded-md shadow-none"
              className="bg-destructive/5 text-destructive p-3 flex items-center gap-2"
            >
              <span className="font-semibold text-sm">
                Toko Sedang Tutup. Maaf, saat ini kami sedang tidak menerima pesanan.
              </span>
            </Card>
          )}

          {isScannedMode && isSelectedTableValid && (
            <Card
              outerClassName="shadow-none border border-primary/20 border rounded-md"
              className="w-full p-3 bg-primary/5"
            >
              <p className="text-sm">
                Nomor meja: <span className="font-semibold">{tableCode}</span>
              </p>
            </Card>
          )}

          {(!isScannedMode || !isSelectedTableValid) && (
            <div className="w-full p-3 space-y-2 border rounded-md bg-background border-border">
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
        </div>

        {categoryNames.length > 0 && (
          <div className="sticky top-0 z-20 px-3 py-2 mb-3 -mx-3 bg-background ">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categoryNames.map((categoryName) => (
                <Button key={categoryName} onClick={() => scrollToCategory(categoryName)} variant="outline">
                  {categoryName}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div>
          {!loading &&
            groupedCatalogs &&
            Object.entries(groupedCatalogs).map(([categoryName, catalogs]) => (
              <section key={categoryName} className="justify-center grid-cols-1" ref={registerSectionRef(categoryName)}>
                <div className="w-full mx-auto scroll-mt-44">
                  <div className="flex items-center w-full gap-2 my-4">
                    <div className="font-bold uppercase">
                      <h2 className="text-2xl text-primary">{categoryName}</h2>
                    </div>
                    <div className="h-0.5 bg-gray-200 grow"></div>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {catalogs.map((catalog, index) => (
                      <CatalogCard key={index} catalog={catalog} isClosed={tenant?.is_operational === false} />
                    ))}
                  </div>
                </div>
              </section>
            ))}
        </div>

        {orderItems.length > 0 && tenant?.is_operational && (
          <>
            <div className="fixed left-0 right-0 px-3 bottom-3 z-999" onClick={handleCheckout}>
              <div className="flex items-center w-full h-16 max-w-3xl mx-auto overflow-hidden border rounded-md shadow-sm bg-background">
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
    </div>
  );
};

export default CatalogPage;
