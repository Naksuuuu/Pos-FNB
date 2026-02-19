import { lazy } from "react";
import { Navigate } from "react-router";
const CatalogPage = lazy(() => import("@/Pages/Customer/Catalog/CatalogPage"));
const CatalogDetailPage = lazy(() => import("@/Pages/Customer/Catalog/CatalogDetailPage"));
const OrderPage = lazy(() => import("@/Pages/Customer/Order/OrderPage"));
const PaymentPage = lazy(() => import("@/Pages/Customer/Payment/PaymentPage"));
const CustLayout = lazy(() => import("@/Components/Layouts/CustLayout"));

const PublicRoute = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/catalog",
    element: <CustLayout children={<CatalogPage />} />,
  },
  {
    path: "/catalog/:catalogId",
    element: <CustLayout children={<CatalogDetailPage />} />,
  },
  {
    path: "/order",
    element: <CustLayout children={<OrderPage />} />,
  },
  {
    path: "/payment",
    element: <CustLayout children={<PaymentPage />} />,
  },
];

export default PublicRoute;
