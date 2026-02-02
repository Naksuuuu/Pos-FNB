import { Button } from "@/Components/Elements/Shadcn/Button/button";
import { Checkbox } from "@/Components/Elements/Shadcn/Checkbox/checkbox";
import { rupiah } from "@/Utils/rupiahHelper";
import { Minus, Plus, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dummyProducts } from "./ListCatalog";
import { useCallback, useState } from "react";
import ActionCard from "@/Components/Fragments/Customer/Common/Card/ActionCard";

const DetailCatalog = () => {
  const { catalogId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const product = dummyProducts.find((item) => item.id.toString() === catalogId);
  const toggle = (itemId) => {
    setSelected((prev) => {
      const isSelected = prev.includes(itemId);
      if (isSelected) return prev.filter((id) => id !== itemId);
      if (prev.length >= 1) return prev; // blok kalau sudah 2
      return [...prev, itemId];
    });
  };

  // console.log(selected);

  const handleOrder = useCallback(() => {
    const { extra, ...productWithoutExtra } = product;
    const orderItems = [productWithoutExtra];
    console.log(JSON.parse(sessionStorage.getItem("orderItems") || "[]"));
    orderItems.push(...JSON.parse(sessionStorage.getItem("orderItems") || "[]"));

    sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
    navigate("/menu");
  }, [product, navigate]);

  return (
    <main className="relative flex flex-col w-full h-screen ">
      <div className="absolute top-4 right-4 ">
        <Button asChild variant="outline" size="icon" className="rounded-full">
          <Link to={"/menu"}>
            <X />
          </Link>
        </Button>
      </div>
      <div className="h-1/3">
        <img
          src="https://studioreplikamakanan.com/wp-content/uploads/2023/09/studioreplikamakanan-1.jpg"
          alt={product.name}
          className="object-cover object-center w-full h-full aspect-video"
        />
      </div>
      <div className="relative min-h-2/3">
        <div className="absolute w-full h-4 -top-3 bg-background rounded-t-2xl"></div>

        <div className="p-3 border-b">
          <h1 className="text-xl uppercase">{product.name}</h1>
          <p className="text-lg font-bold">{rupiah(product.harga)}</p>
          <p className="mt-2 mb-4 text-xs text-muted-foreground">{product.description}</p>
        </div>

        {product.extra && (
          <div className="h-screen ">
            {product.extra.map((extra) => (
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
                                  {value.harga > 0 && (
                                    <span className="text-xs font-bold"> (+{rupiah(value.harga)})</span>
                                  )}
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
        )}

        <ActionCard onActionClick={handleOrder} actionTitle="Tambah Order">
          <p>Total Order</p>
          <div className="flex items-center gap-4">
            <Button size="icon" className="rounded-full size-6" variant="outline">
              <Minus />
            </Button>
            1
            <Button size="icon" className="rounded-full size-6" variant="outline">
              <Plus />
            </Button>
          </div>
        </ActionCard>
      </div>
    </main>
  );
};

export default DetailCatalog;
