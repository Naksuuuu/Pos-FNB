import { lazy } from "react";
import { Navigate } from "react-router";

import { ROUTES } from "@/Constants/Common/RouteConstant";

const CatalogPage = lazy(() => import("@/Pages/Customer/Catalog/CatalogPage"));
const CatalogDetailPage = lazy(() => import("@/Pages/Customer/Catalog/CatalogDetailPage"));
const OrderPage = lazy(() => import("@/Pages/Customer/Order/OrderPage"));
const PaymentPage = lazy(() => import("@/Pages/Customer/Payment/PaymentPage"));
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
