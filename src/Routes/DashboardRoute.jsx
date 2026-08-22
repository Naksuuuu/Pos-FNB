import { lazy, Suspense } from "react";
import { Outlet } from "react-router";

import { ROUTES } from "@/Constants/RouteConstant";
import { BluetoothPrinterProvider } from "@/Features/Shared/Context/BluetoothPrinterContext";

import ProtectedRoute from "@/Routes/ProtectedRoute";
import LoadingApp from "@/Pages/LoadingApp";
import TenantTierGuard from "@/Routes/TenantTierGuard";

const OrderPage = lazy(() => import("@/Features/Dashboard/Order/Pages/OrderPage"));
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const HomePage = lazy(() => import("@/Features/Dashboard/Home/Pages/HomePage"));
const CashierPage = lazy(() => import("@/Features/Dashboard/Cashier/Pages/CashierPage"));
const MenuPage = lazy(() => import("@/Features/Dashboard/Menu/Pages/MenuPage"));
const CategoryPage = lazy(() => import("@/Features/Dashboard/Category/Pages/CategoryPage"));
const DiningTablePage = lazy(() => import("@/Features/Dashboard/DiningTable/Pages/DiningTablePage"));
const CustomOptionPage = lazy(() => import("@/Features/Dashboard/CustomOption/Pages/CustomOptionPage"));
const UserPage = lazy(() => import("@/Features/Dashboard/User/Pages/UserPage"));
const ProfilePage = lazy(() => import("@/Features/Dashboard/Profile/Pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/Features/Dashboard/Settings/Pages/SettingsPage"));
const RewardPage = lazy(() => import("@/Features/Dashboard/Reward/Pages/RewardPage"));
const SidebarProvider = lazy(() =>
  import("@/Components/Elements/Shadcn/sidebar").then((m) => ({ default: m.SidebarProvider })),
);

const DashboardLayout = () => {
  return (
    <Suspense fallback={<LoadingApp />}>
      <ProtectedRoute allowedRoles={["admin", "cashier"]}>
        <BluetoothPrinterProvider>
          <SidebarProvider>
            <DashLayout>
              <Outlet />
            </DashLayout>
          </SidebarProvider>
        </BluetoothPrinterProvider>
      </ProtectedRoute>
    </Suspense>
  );
};

const DashboardRoute = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.DASHBOARD.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.DASHBOARD.SETTINGS,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.DASHBOARD.USER,
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.DASHBOARD.INVENTORY.MENU,
        element: <MenuPage />,
      },
      {
        path: ROUTES.DASHBOARD.INVENTORY.CATEGORY,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.DASHBOARD.INVENTORY.TABLE,
        element: <DiningTablePage />,
      },
      {
        path: ROUTES.DASHBOARD.CUSTOM,
        element: <CustomOptionPage />,
      },
      {
        path: ROUTES.DASHBOARD.ORDER,
        element: <OrderPage />,
      },
      {
        path: ROUTES.DASHBOARD.CASHIER,
        element: <CashierPage />,
      },
      {
        path: ROUTES.DASHBOARD.REWARD,
        element: (
          <ProtectedRoute allowedRoles={["admin", "cashier"]}>
            <TenantTierGuard allowedTiers={["pro"]}>
              <RewardPage />
            </TenantTierGuard>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default DashboardRoute;
