import { lazy } from "react";
import { Navigate } from "react-router";
const ListCatalog = lazy(() => import("@/Pages/Customer/Catalog/ListCatalog"));
const DetailCatalog = lazy(() => import("@/Pages/Customer/Catalog/DetailCatalog"));
const SummaryOrder = lazy(() => import("@/Pages/Customer/Order/SummaryOrder"));

const PublicRoute = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
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
