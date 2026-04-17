import { lazy } from "react";
import { Navigate } from "react-router";

import { ROUTES } from "@/Constants/RouteConstant";

const CatalogPage = lazy(() => import("@/Features/Customer/Catalog/Pages/CatalogPage"));
const CatalogDetailPage = lazy(() => import("@/Features/Customer/Catalog/Pages/CatalogDetailPage"));
const OrderPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderPage"));
const PaymentPage = lazy(() => import("@/Features/Customer/Payment/Pages/PaymentPage"));
const CustLayout = lazy(() => import("@/Components/Layouts/CustLayout"));

const PublicRoute = [
  {
    path: ROUTES.PUBLIC.HOME,
    element: <Navigate to={ROUTES.DASHBOARD.HOME} />,
  },
  {
    path: ROUTES.PUBLIC.CATALOG,
    element: <CustLayout children={<CatalogPage />} />,
  },
  {
    path: ROUTES.PUBLIC.CATALOG_DETAIL,
    element: <CustLayout children={<CatalogDetailPage />} />,
  },
  {
    path: ROUTES.PUBLIC.ORDER,
    element: <CustLayout children={<OrderPage />} />,
  },
  {
    path: ROUTES.PUBLIC.PAYMENT,
    element: <CustLayout children={<PaymentPage />} />,
  },
];

export default PublicRoute;
