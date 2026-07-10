import { Link } from "react-router";
import { CircleOff, Minus, Plus, X } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";

import useDetailCatalog from "@/Features/Customer/Catalog/Hooks/useDetailCatalog";

import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import ActionCard from "@/Features/Customer/Shared/Components/Card/ActionCard";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import useTenant from "@/Features/Shared/Hooks/useTenant";

const CatalogDetailPage = () => {
  const {
    catalog,
    loading,
    quantity,
    incrementQuantity,
    decrentQuantity,
    handleOrder,
    isFromOrder,
    queryWithCode,
  } = useDetailCatalog();

  const { tenant } = useTenant();
  const isClosed = tenant?.is_operational === false;
  const canAddTopping = false;

  return (
    <main className="relative flex flex-col w-full h-screen ">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          nativeButton={false}
          render={(props) => (
            <Link {...props} to={`${isFromOrder ? ROUTES.PUBLIC.ORDER : ROUTES.PUBLIC.CATALOG}${queryWithCode}`} />
          )}
        >
          <X />
        </Button>
      </div>

      {loading && (
        <Skeleton className="flex items-center justify-center w-full h-full">
          <Spinner className="size-8" />
        </Skeleton>
      )}

      {catalog && !loading && (
        <>
          <div className="h-1/3">
            <ImageWithFallback
              src={catalog.image_url}
              alt={catalog.name}
              className="object-cover object-center w-full h-full aspect-video"
            />
          </div>
          <div className="relative min-h-2/3 bg-linear-to-b from-background via-background to-muted/30">
            <div className="absolute w-full h-4 -top-3 bg-background rounded-t-2xl"></div>

            <div className="p-3 border-b">
              <h1 className="text-xl uppercase">{catalog.name}</h1>
              <p className="text-lg font-bold">{rupiah(catalog.price)}</p>
              <p className="mt-2 mb-4 text-xs text-muted-foreground">{catalog.description}</p>
            </div>

            <div className="p-3 space-y-3 border-b">
              <h2 className="text-sm font-semibold uppercase">Topping</h2>

              {!canAddTopping && (
                <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed min-h-100 rounded-xl bg-muted/30 border-border">
                  <CircleOff className="mb-3 size-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tidak ada topping tersedia untuk menu ini.</p>
                </div>
              )}
            </div>

            <ActionCard
              onActionClick={() => handleOrder(catalog, quantity)}
              actionTitle={isClosed ? "Toko Sedang Tutup" : isFromOrder ? "Update Order" : "Tambah Order"}
              disabled={isClosed}
            >
              <p>Total Items</p>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  className="rounded-full size-6"
                  variant="outline"
                  onClick={() => decrentQuantity(1)}
                  disabled={isClosed}
                >
                  <Minus />
                </Button>
                {quantity}
                <Button
                  size="icon"
                  className="rounded-full size-6"
                  variant="outline"
                  onClick={() => incrementQuantity(1)}
                  disabled={isClosed}
                >
                  <Plus />
                </Button>
              </div>
            </ActionCard>
          </div>
        </>
      )}
    </main>
  );
};

export default CatalogDetailPage;

/* {catalog?.extra && (
          <div className="h-screen ">
            {catalog.extra.map((extra) => (
              <div className="p-3 border-b-3" key={extra.title}>
                {Object.entries(extra).map(([toppingName, toppingValues]) => {
                  return (
                    <div key={toppingName}>
                      {toppingName === "title" && <h2 className="mb-4 text-lg font-bold uppercase">{extra.title}</h2>}
                      {toppingName !== "title" && Array.isArray(toppingValues) && (
                        <div className="flex flex-col gap-3 mb-4 uppercase">
                          {toppingValues.map((value) => {
                            const checked = selected.includes(value.title);
                            return (
                              <div className="flex items-center justify-between" key={value.title}>
                                <p>
                                  {value.title}
                                  {value.harga > 0 && <span className="text-xs font-bold"> (+{rupiah(value.harga)})</span>}
                                </p>
                                <Checkbox
                                  className="border-gray-400"
                                  checked={checked}
                                  // disabled={false}
                                  onCheckedChange={() => toggle(value.title)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )} */
