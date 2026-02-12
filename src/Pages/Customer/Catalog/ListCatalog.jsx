import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";

import { rupiah } from "@/Utils/rupiahHelper";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import CatalogCard from "@/Components/Fragments/Customer/Catalog/Card/CatalogCard";

const dummyProducts = [
  {
    id: 1,
    category: "makanan",
    description: "makanan enak banget pake banget",
    name: "Baso",
    harga: 20000,
    extra: [
      {
        title: "level pedas",
        levelPedas: [
          {
            title: "level 0",
            harga: 0,
          },
          {
            title: "level 1",
            harga: 0,
          },
          {
            title: "level 2",
            harga: 0,
          },
          {
            title: "level 3",
            harga: 0,
          },
          {
            title: "level 4",
            harga: 1000,
          },
        ],
      },
      {
        title: "topping tambahan",
        extraTopping: [
          {
            title: "tahu",
            harga: 2000,
          },
          {
            title: "bakso goreng",
            harga: 3000,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    category: "minuman",
    description: "makanan enak banget pake banget",
    name: "Baso",
    harga: 15000,
    extra: null,
  },
  {
    id: 3,
    category: "makanan",
    description: "makanan enak banget pake banget",
    name: "Baso",
    harga: 25000,
    extra: null,
  },
  {
    id: 4,
    category: "minuman",
    description: "makanan enak banget pake banget",
    name: "Baso",
    harga: 10000,
    extra: null,
  },
  {
    id: 5,
    category: "penutup",
    description: "makanan enak banget pake banget",
    name: "Baso",
    harga: 30000,
    extra: null,
  },
  {
    id: 6,
    category: "makanan ringan",
    description: "makanan enak banget pake banget",
    name: "Baso",
    harga: 5000,
    extra: null,
  },
];

const ListCatalog = () => {
  const navigate = useNavigate();
  const productGroupByCategory = Object.groupBy(dummyProducts, (product) => product.category);
  const isOrderItems = JSON.parse(sessionStorage.getItem("orderItems") || "[]");

  const totalPrice = useMemo(() => isOrderItems.reduce((acc, item) => acc + item.harga, 0), [isOrderItems]);

  const handleCheckout = () => {
    navigate("/order");
  };

  return (
    <>
      <main className="relative flex flex-col gap-4 items-center justify-center w-full min-h-screen px-3">
        <div className="w-full">
          {Object.entries(productGroupByCategory).map(([categoryName, products]) => (
            <div key={categoryName} className="justify-center grid-cols-1">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center w-full gap-2 my-4">
                  <div className="font-bold uppercase">
                    <h2 className="text-2xl">{categoryName}</h2>
                  </div>
                  <div className="h-0.5 bg-gray-200 grow"></div>
                </div>
                <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-2">
                  {products.map((product, index) => (
                    <CatalogCard key={index} {...product} imagePath={"https://studioreplikamakanan.com/wp-content/uploads/2023/09/studioreplikamakanan-1.jpg"} />
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
                <div className="bg-emerald-700 w-full h-full flex justify-between items-center text-background px-4 py-2">
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

export { dummyProducts };

export default ListCatalog;
