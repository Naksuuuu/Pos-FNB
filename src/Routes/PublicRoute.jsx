import { lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { ROUTES } from "@/Constants/RouteConstant";
import TenantTierGuard from "./TenantTierGuard";
import CustomerRouteGuard from "./CustomerRouteGuard";

const CatalogPage = lazy(() => import("@/Features/Customer/Catalog/Pages/CatalogPage"));
const CatalogDetailPage = lazy(() => import("@/Features/Customer/Catalog/Pages/CatalogDetailPage"));
const OrderPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderPage"));
const PaymentPage = lazy(() => import("@/Features/Customer/Payment/Pages/PaymentPage"));
const UserPage = lazy(() => import("@/Features/Customer/User/Pages/UserPage"));
const ProfilePage = lazy(() => import("@/Features/Customer/Profile/Pages/ProfilePage"));
const OrderHistoryPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderHistoryPage"));
const OrderHistoryDetailPage = lazy(() => import("@/Features/Customer/Order/Pages/OrderHistoryDetailPage"));
const CustomerRewardPage = lazy(() => import("@/Features/Customer/Reward/Pages/CustomerRewardPage"));
const CustomerMyRewardPage = lazy(() => import("@/Features/Customer/Reward/Pages/CustomerMyRewardPage"));
const CustLayout = lazy(() => import("@/Components/Layouts/CustLayout"));

const CustomerLayout = () => {
  return (
    <CustomerRouteGuard>
      <CustLayout>
        <Outlet />
      </CustLayout>
    </CustomerRouteGuard>
  );
};

const PublicRoute = [
  {
    path: ROUTES.PUBLIC.HOME,
    element: <Navigate to={ROUTES.PUBLIC.CATALOG} />,
  },
  {
    element: <CustomerLayout />,
    children: [
      {
        path: ROUTES.PUBLIC.CATALOG,
        element: <CatalogPage />,
      },
      {
        path: ROUTES.PUBLIC.CATALOG_DETAIL,
        element: <CatalogDetailPage />,
      },
      {
        path: ROUTES.PUBLIC.ORDER,
        element: <OrderPage />,
      },
      {
        path: ROUTES.PUBLIC.PAYMENT,
        element: <PaymentPage />,
      },
      {
        path: ROUTES.PUBLIC.USER,
        element: <UserPage />,
      },
      {
        path: ROUTES.PUBLIC.PROFILE,
        element: (
          <TenantTierGuard allowedTiers={["pro"]}>
            <ProfilePage />
          </TenantTierGuard>
        ),
      },
      {
        path: ROUTES.PUBLIC.ORDER_HISTORY,
        element: <OrderHistoryPage />,
      },
      {
        path: ROUTES.PUBLIC.ORDER_HISTORY_DETAIL,
        element: <OrderHistoryDetailPage />,
      },
      {
        path: ROUTES.PUBLIC.REWARDS,
        element: (
          <TenantTierGuard allowedTiers={["pro"]}>
            <CustomerRewardPage />
          </TenantTierGuard>
        ),
      },
      {
        path: ROUTES.PUBLIC.MY_REWARDS,
        element: (
          <TenantTierGuard allowedTiers={["pro"]}>
            <CustomerMyRewardPage />
          </TenantTierGuard>
        ),
      },
    ],
  },
];

export default PublicRoute;
