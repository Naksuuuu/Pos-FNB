import { Card } from "@/Components/Elements/Cards/Card";
import { ImageWithFallback } from "@/Components/Elements/Images/ImageWithFallback";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { rupiah } from "@/Utils/rupiahHelper";

const CashierMenuCard = ({ loadingResources, menus, addToCart }) => {
  return (
    <>
      {loadingResources &&
        Array.from({ length: 20 }).map((_, index) => (
          <Card key={`menu-loading-${index}`} className="space-y-3">
            <Skeleton className="w-full h-50 " />
            <Skeleton className="w-3/4 h-4 " />
            <Skeleton className="w-1/2 h-4 " />
          </Card>
        ))}

      {!loadingResources &&
        menus.map((menu) => (
          <Card key={menu.id} className="space-y-3 cursor-pointer" onClick={() => addToCart(menu)}>
            <div className="relative w-full overflow-hidden rounded-md h-50">
              <ImageWithFallback src={menu.image_url} alt={menu.name} className="object-cover w-full h-full max-h-50 object-center aspect-video" />
              <Badge className="absolute right-2 top-2" variant="secondary">
                {menu.category?.name || "Menu"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-semibold line-clamp-1">{menu.name}</p>
              <p className="text-sm font-medium text-primary">{rupiah(menu.price)}</p>
            </div>
          </Card>
        ))}

      {!loadingResources && menus.length === 0 && <Card className="col-span-full py-8 text-center text-muted-foreground">Belum ada menu tersedia untuk kasir.</Card>}
    </>
  );
};
export default CashierMenuCard;
