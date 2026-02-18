import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Minus, Plus, X } from "lucide-react";

import useDetailCatalog from "@/Hooks/Customer/Catalog/useDetailCatalog";
import { rupiah } from "@/Utils/rupiahHelper";

import { Button } from "@/Components/Elements/Shadcn/button";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CatalogDetailPage = () => {
  const { catalog, loading } = useDetailCatalog();

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = useCallback((qty) => {
    setQuantity((prev) => Math.max(1, prev + qty));
  }, []);

  const decrentQuantity = useCallback((qty) => {
    setQuantity((prev) => Math.max(1, prev - qty));
  }, []);

  const handleOrder = useCallback(
    (catalog, quantity) => {
      const orderItems = [
        {
          name: catalog.name,
          menu_id: catalog.id,
          qty: quantity,
          price: (catalog.price || 0) * quantity,
        },
      ];
      orderItems.push(...JSON.parse(sessionStorage.getItem("orderItems") || "[]"));

      sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
      navigate("/catalog");
    },
    [navigate],
  );

  return (
    <main className="relative flex flex-col w-full h-screen ">
      <div className="absolute top-4 right-4 ">
        <Button variant="outline" size="icon" className="rounded-full" nativeButton={false} render={(props) => <Link {...props} to="/catalog" />}>
          <X />
        </Button>
      </div>

      {loading && (
        <Skeleton className="h-full w-full flex items-center justify-center">
          <Spinner className="size-8" />
        </Skeleton>
      )}

      {catalog && !loading && (
        <>
          <div className="h-1/3">
            <img src={catalog.image_url} alt={catalog.name} className="object-cover object-center w-full h-full aspect-video" />
          </div>
          <div className="relative min-h-2/3">
            <div className="absolute w-full h-4 -top-3 bg-background rounded-t-2xl"></div>

            <div className="p-3 border-b">
              <h1 className="text-xl uppercase">{catalog.name}</h1>
              <p className="text-lg font-bold">{rupiah(catalog.price)}</p>
              <p className="mt-2 mb-4 text-xs text-muted-foreground">{catalog.description}</p>
            </div>

            <ActionCard onActionClick={() => handleOrder(catalog, quantity)} actionTitle="Tambah Order">
              <p>Total Order</p>
              <div className="flex items-center gap-4">
                <Button size="icon" className="rounded-full size-6" variant="outline" onClick={() => decrentQuantity(1)}>
                  <Minus />
                </Button>
                {quantity}
                <Button size="icon" className="rounded-full size-6" variant="outline" onClick={() => incrementQuantity(1)}>
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
