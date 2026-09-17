import { Link } from "react-router";
import { CircleOff, Minus, Plus, X } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import useDetailCatalog from "@/Features/Customer/Catalog/Hooks/useDetailCatalog";
import { rupiah } from "@/Utils/rupiahHelper";
import { cn } from "@/Utils/cn";

import { Button } from "@/Components/Elements/Shadcn/button";
import { Checkbox } from "@/Components/Elements/Shadcn/checkbox";
import ActionCard from "@/Features/Customer/Shared/Components/Card/ActionCard";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import useTenant from "@/Features/Shared/Hooks/useTenant";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

const CatalogDetailPage = () => {
  const { catalog, loading, quantity, incrementQuantity, decrentQuantity, handleOrder, isFromOrder, queryWithCode, selectedCustoms, toggleCustomOption, itemUnitPrice } = useDetailCatalog();

  const { tenant } = useTenant();
  const { isTenantPro, loading: loadingTenantTier } = useTenantTier();
  const isClosed = tenant?.is_operational === false;

  return (
    <main className="relative flex flex-col w-full min-h-screen">
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          nativeButton={false}
          render={(props) => <Link {...props} to={`${isFromOrder ? ROUTES.PUBLIC.ORDER : ROUTES.PUBLIC.CATALOG}${queryWithCode}`} />}
        >
          <X />
        </Button>
      </div>

      {loading && (
        <Skeleton className="flex items-center justify-center w-full h-full min-h-screen">
          <Spinner className="size-8" />
        </Skeleton>
      )}

      {catalog && !loading && (
        <>
          <div className="h-1/3 min-h-[220px]">
            <ImageWithFallback src={catalog.image_url} alt={catalog.name} className="object-cover object-center w-full h-full aspect-video" />
          </div>
          <div className="relative flex-1 bg-linear-to-b from-background via-background to-muted/30 pb-24 overflow-y-auto">
            <div className="absolute w-full h-4 -top-3 bg-background rounded-t-2xl"></div>

            <div className="p-3 border-b">
              <h1 className="text-xl uppercase">{catalog.name}</h1>
              <p className="text-lg font-bold">
                {rupiah(itemUnitPrice)}
                {itemUnitPrice !== Number(catalog.price) && <span className="ml-2 text-xs font-normal text-muted-foreground line-through">{rupiah(catalog.price)}</span>}
              </p>
              {catalog.description && <p className="mt-2 mb-4 text-xs text-muted-foreground">{catalog.description}</p>}
            </div>

            {!loadingTenantTier && (
              isTenantPro ? (
                <div className="p-3 space-y-3 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase">Opsi Kustom</h2>
                  {catalog.custom_options && catalog.custom_options.length > 0 && <span className="text-xs text-muted-foreground">Bisa pilih lebih dari satu</span>}
                </div>

                {catalog.custom_options && catalog.custom_options.length > 0 ? (
                  <div className="space-y-2">
                    {catalog.custom_options.map((option) => {
                      const isSelected = selectedCustoms.includes(option.id);
                      return (
                        <div
                          key={option.id}
                          onClick={() => toggleCustomOption(option.id)}
                          className={cn(
                            "flex items-center justify-between p-3 border rounded-md cursor-pointer transition-all select-none",
                            isSelected ? "border-primary bg-primary/10 text-primary font-medium shadow-xs" : "border-border bg-card/50 text-foreground hover:bg-muted/40",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox checked={isSelected} onCheckedChange={() => toggleCustomOption(option.id)} />
                            <span className="text-sm">{option.name}</span>
                          </div>
                          <span className="text-xs font-semibold">{Number(option.price) > 0 ? `+${rupiah(Number(option.price))}` : "Gratis"}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-xl bg-muted/30 border-border">
                    <CircleOff className="mb-3 size-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Tidak ada opsi kustom tersedia untuk menu ini.</p>
                  </div>
                )}
                </div>
              ) : (
                <div className="p-3 border-b">
                  <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-xl bg-muted/30 border-border">
                    <CircleOff className="mb-3 size-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Tidak ada opsi kustom tersedia untuk menu ini.</p>
                  </div>
                </div>
              )
            )}

            <ActionCard onActionClick={() => handleOrder(catalog, quantity)} actionTitle={isClosed ? "Toko Sedang Tutup" : isFromOrder ? "Update Order" : "Tambah Order"} disabled={isClosed}>
              <p>Total Items</p>
              <div className="flex items-center gap-4">
                <Button size="icon" className="rounded-full size-6" variant="outline" onClick={() => decrentQuantity(1)} disabled={isClosed}>
                  <Minus />
                </Button>
                {quantity}
                <Button size="icon" className="rounded-full size-6" variant="outline" onClick={() => incrementQuantity(1)} disabled={isClosed}>
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
