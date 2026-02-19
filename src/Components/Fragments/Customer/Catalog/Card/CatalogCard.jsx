import { Link } from "react-router";

import { rupiah } from "@/Utils/rupiahHelper";

import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/Elements/Shadcn/card";

const ProductCard = ({ catalog }) => {
  return (
    <Card className="relative w-full max-w-sm gap-0 py-3 pt-0 mx-auto overflow-hidden">
      <CardHeader className="p-3">
        <div className="relative w-full overflow-hidden rounded-md aspect-12/10">
          <ImageWithFallback src={catalog.image_url} alt={catalog.name} className="absolute inset-0 object-cover object-center w-full h-full" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full gap-2 px-3">
        <CardTitle>{catalog.name}</CardTitle>
        <CardDescription>{rupiah(catalog.price)}</CardDescription>

        <CardFooter className="w-full gap-2 p-0 md:flex-row">
          <Button className="w-full" variant="outline" nativeButton={false} render={(props) => <Link {...props} to={`/catalog/${catalog.id}`} />}>
            Tambah
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
