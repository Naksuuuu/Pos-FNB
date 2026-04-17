import { lazy, Suspense } from "react";

import { ROUTES } from "@/Constants/RouteConstant";

import ProtectedRoute from "@/Routes/ProtectedRoute";

import LoadingApp from "@/Pages/LoadingApp";
const OrderPage = lazy(() => import("@/Features/Dashboard/Order/Pages/OrderPage"));
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const HomePage = lazy(() => import("@/Features/Dashboard/Home/Pages/HomePage"));
const CashierPage = lazy(() => import("@/Features/Dashboard/Cashier/Pages/CashierPage"));
const MenuPage = lazy(() => import("@/Features/Dashboard/Menu/Pages/MenuPage"));
const CategoryPage = lazy(() => import("@/Features/Dashboard/Category/Pages/CategoryPage"));
const DiningTablePage = lazy(() => import("@/Features/Dashboard/DiningTable/Pages/DiningTablePage"));
const UserPage = lazy(() => import("@/Features/Dashboard/User/Pages/UserPage"));
const ProfilePage = lazy(() => import("@/Features/Dashboard/Profile/Pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/Features/Dashboard/Settings/Pages/SettingsPage"));
const SidebarProvider = lazy(() => import("@/Components/Elements/Shadcn/sidebar").then((m) => ({ default: m.SidebarProvider })));

const createProtectedRoute = (component, allowedRoles) => {
  return (
    <Suspense fallback={<LoadingApp />}>
      <ProtectedRoute allowedRoles={allowedRoles}>
        <SidebarProvider>
          <DashLayout>{component}</DashLayout>
        </SidebarProvider>
      </ProtectedRoute>
    </Suspense>
  );
};

const DashboardRoute = [
  {
    path: ROUTES.DASHBOARD.HOME,
    element: createProtectedRoute(<HomePage />, ["admin", "cashier"]),
  },
  {
    path: ROUTES.DASHBOARD.PROFILE,
    element: createProtectedRoute(<ProfilePage />, ["admin", "cashier"]),
  },
  {
    path: ROUTES.DASHBOARD.SETTINGS,
    element: createProtectedRoute(<SettingsPage />, ["admin"]),
  },
  {
    path: ROUTES.DASHBOARD.USER,
    element: createProtectedRoute(<UserPage />, ["admin"]),
  },

  {
    path: ROUTES.DASHBOARD.INVENTORY.MENU,
    element: createProtectedRoute(<MenuPage />, ["admin", "cashier"]),
  },
  {
    path: ROUTES.DASHBOARD.INVENTORY.CATEGORY,
    element: createProtectedRoute(<CategoryPage />, ["admin", "cashier"]),
  },
  {
    path: ROUTES.DASHBOARD.INVENTORY.TABLE,
    element: createProtectedRoute(<DiningTablePage />, ["admin", "cashier"]),
  },
  {
    path: ROUTES.DASHBOARD.ORDER,
    element: createProtectedRoute(<OrderPage />, ["admin", "cashier"]),
  },

  {
    path: ROUTES.DASHBOARD.CASHIER,
    element: createProtectedRoute(<CashierPage />, ["admin", "cashier"]),
  },
];

export default DashboardRoute;
