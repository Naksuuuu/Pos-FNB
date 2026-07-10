import { lazy } from "react";
import { Navigate } from "react-router";

import { ROUTES } from "@/Constants/RouteConstant";

const CatalogPage = lazy(() => import("@/Features/Customer/Catalog/Pages/CatalogPage"));
const CatalogDetailPage = lazy(() => import("@/Features/Customer/Catalog/Pages/CatalogDetailPage"));
const OrderPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderPage"));
const PaymentPage = lazy(() => import("@/Features/Customer/Payment/Pages/PaymentPage"));
const UserPage = lazy(() => import("@/Features/Customer/User/Pages/UserPage"));
const ProfilePage = lazy(() => import("@/Features/Customer/Profile/Pages/ProfilePage"));
const OrderHistoryPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderHistoryPage"));
const OrderHistoryDetailPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderHistoryDetailPage"));
const CustLayout = lazy(() => import("@/Components/Layouts/CustLayout"));
import TenantTierGuard from "./TenantTierGuard";

const PublicRoute = [
  {
    path: ROUTES.PUBLIC.HOME,
    element: <Navigate to={ROUTES.PUBLIC.CATALOG} />,
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
  {
    path: ROUTES.PUBLIC.USER,
    element: <CustLayout children={<UserPage />} />,
  },
  {
    path: ROUTES.PUBLIC.PROFILE,
    element: (
      <TenantTierGuard allowedTiers={["pro"]}>
        <CustLayout children={<ProfilePage />} />
      </TenantTierGuard>
    ),
  },
  {
    path: ROUTES.PUBLIC.ORDER_HISTORY,
    element: <CustLayout children={<OrderHistoryPage />} />,
  },
  {
    path: ROUTES.PUBLIC.ORDER_HISTORY_DETAIL,
    element: <CustLayout children={<OrderHistoryDetailPage />} />,
  },
];

export default PublicRoute;
