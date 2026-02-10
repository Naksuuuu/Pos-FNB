import { Link } from "react-router-dom";

import { Badge } from "@/Components/Elements/Shadcn/Badge/badge";
import { Button } from "@/Components/Elements/Shadcn/Button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/Elements/Shadcn/Card/card";

const ProductCard = ({ imagePath, name, category, description, id }) => {
  return (
    <Card className="relative w-full max-w-sm pt-0 mx-auto overflow-hidden">
      <img src={imagePath} alt={name} className="relative z-20 object-cover object-center w-full aspect-12/10" />
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col justify-between w-full gap-2 md:flex-row">
        <Button asChild className="w-full md:w-1/3 bg-emerald-600 hover:bg-emerald-700">
          <Link to={`/menu/${id}`}>Tambah</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
