import { Link } from "react-router";

import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/Elements/Shadcn/card";
import defaultImage from "@/Assets/default-image.svg";
import { rupiah } from "@/Utils/rupiahHelper";

const ProductCard = ({ catalog }) => {
  return (
    <Card className="relative w-full max-w-sm py-3 gap-0 pt-0 mx-auto overflow-hidden">
      <CardHeader className="p-3">
        <div className="relative w-full overflow-hidden rounded-md aspect-12/10">
          <img
            src={catalog.image_url}
            onError={(e) => {
              e.target.onError = "";
              e.target.src = defaultImage;
            }}
            alt={catalog.name}
            className="absolute inset-0 object-cover object-center w-full h-full"
          />
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
