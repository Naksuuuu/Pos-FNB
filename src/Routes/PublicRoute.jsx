import { lazy } from "react";
import { Navigate } from "react-router";
const CatalogPage = lazy(() => import("@/Pages/Customer/Catalog/CatalogPage"));
const CatalogDetailPage = lazy(() => import("@/Pages/Customer/Catalog/CatalogDetailPage"));
const SummaryOrder = lazy(() => import("@/Pages/Customer/Order/SummaryOrder"));

const PublicRoute = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/catalog",
    element: <CatalogPage />,
  },
  {
    path: "/catalog/:catalogId",
    element: <CatalogDetailPage />,
  },
  {
    path: "/order",
    element: <SummaryOrder />,
  },
];

export default PublicRoute;
