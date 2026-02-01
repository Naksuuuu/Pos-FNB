import { lazy } from "react";
const ListCatalog = lazy(() => import("@/Pages/Customer/Catalog/ListCatalog"));
const DetailCatalog = lazy(() => import("@/Pages/Customer/Catalog/DetailCatalog"));
const SummaryOrder = lazy(() => import("@/Pages/Customer/Order/SummaryOrder"));

const PublicRoute = [
  {
    path: "/menu",
    element: <ListCatalog />,
  },
  {
    path: "/menu/:catalogId",
    element: <DetailCatalog />,
  },
  {
    path: "/order",
    element: <SummaryOrder />,
  },
];

export default PublicRoute;
