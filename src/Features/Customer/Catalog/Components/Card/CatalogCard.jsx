import { Link, useSearchParams } from "react-router";

import { ROUTES } from "@/Constants/RouteConstant";
import { rupiah } from "@/Utils/rupiahHelper";

import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/Elements/Shadcn/card";

const ProductCard = ({ catalog, isClosed }) => {
  const [searchParams] = useSearchParams();
  const tableCode = searchParams.get("code")?.trim() || "";

  return (
    <Card className="relative w-full max-w-sm gap-0 py-3 pt-0 mx-auto overflow-hidden">
      <CardHeader className="p-3">
        <div className={`relative w-full overflow-hidden rounded-md aspect-12/10 ${isClosed ? "grayscale opacity-60" : ""}`}>
          {isClosed && (
            <Badge className="absolute top-2 right-2 bg-destructive/90 text-white border-none shadow-sm z-10" variant="destructive">
              Tutup
            </Badge>
          )}
          <ImageWithFallback src={catalog.image_url} alt={catalog.name} className="absolute inset-0 object-cover object-center w-full h-full" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full gap-2 px-3">
        <CardTitle>{catalog.name}</CardTitle>
        <CardDescription>{rupiah(catalog.price)}</CardDescription>

        <CardFooter className="w-full gap-2 p-0 md:flex-row">
          {isClosed ? (
            <Button className="w-full" variant="outline" disabled>
              Toko Tutup
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="outline"
              nativeButton={false}
              render={(props) => <Link {...props} to={`${ROUTES.PUBLIC.CATALOG_DETAIL.replace(":catalogId", catalog.id)}${tableCode ? `?code=${encodeURIComponent(tableCode)}` : ""}`} />}
            >
              Tambah
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
