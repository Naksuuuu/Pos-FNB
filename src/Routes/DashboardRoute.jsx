import { lazy, Suspense } from "react";

import { ROUTES } from "@/Constants/Common/RouteConstant";

import ProtectedRoute from "@/Routes/ProtectedRoute";

import LoadingApp from "@/Pages/Common/LoadingApp";
const OrderPage = lazy(() => import("@/Pages/Dashboard/Order/OrderPage"));
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const MenuPage = lazy(() => import("@/Pages/Dashboard/Menu/MenuPage"));
const CategoryPage = lazy(() => import("@/Pages/Dashboard/Category/CategoryPage"));
const DiningTablePage = lazy(() => import("@/Pages/Dashboard/DiningTable/DiningTablePage"));
const UserPage = lazy(() => import("@/Pages/Dashboard/User/UserPage"));
const ProfilePage = lazy(() => import("@/Pages/Dashboard/Profile/ProfilePage"));
const SidebarProvider = lazy(() =>
  import("@/Components/Elements/Shadcn/sidebar").then((m) => ({ default: m.SidebarProvider })),
);

const createProtectedRoute = (component) => {
  return (
    <Suspense fallback={<LoadingApp />}>
      <ProtectedRoute>
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
    element: createProtectedRoute(<Dashboard />),
  },
  {
    path: ROUTES.DASHBOARD.USER,
    element: createProtectedRoute(<UserPage />),
  },
  {
    path: ROUTES.DASHBOARD.CASHIER,
    element: createProtectedRoute(<PanelCashier />),
  },
  {
    path: ROUTES.DASHBOARD.INVENTORY.MENU,
    element: createProtectedRoute(<MenuPage />),
  },
  {
    path: ROUTES.DASHBOARD.INVENTORY.MENU_CATEGORY,
    element: createProtectedRoute(<CategoryPage />),
  },
  {
    path: ROUTES.DASHBOARD.INVENTORY.TABLE,
    element: createProtectedRoute(<DiningTablePage />),
  },
  {
    path: ROUTES.DASHBOARD.ORDER,
    element: createProtectedRoute(<OrderPage />),
  },
  {
    path: ROUTES.DASHBOARD.PROFILE,
    element: createProtectedRoute(<ProfilePage />),
  },
];

export default DashboardRoute;
