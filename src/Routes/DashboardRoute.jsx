import { lazy, Suspense } from "react";

import { ROUTES } from "@/Constants/Common/RouteConstant";

import LoadingApp from "@/Pages/Common/LoadingApp";
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const MenuPage = lazy(() => import("@/Pages/Dashboard/Menu/MenuPage"));
const CategoryPage = lazy(() => import("@/Pages/Dashboard/Category/CategoryPage"));
const DiningTablePage = lazy(() => import("@/Pages/Dashboard/DiningTable/DiningTablePage"));

const SidebarProvider = lazy(() =>
  import("@/Components/Elements/Shadcn/sidebar").then((m) => ({ default: m.SidebarProvider })),
);
const createProtectedRoute = (component) => {
  return (
    <Suspense fallback={<LoadingApp />}>
      <SidebarProvider>
        <DashLayout>{component}</DashLayout>
      </SidebarProvider>
    </Suspense>
  );
};

const DashboardRoute = [
  {
    path: ROUTES.DASHBOARD.HOME,
    element: createProtectedRoute(<Dashboard />),
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
];

export default DashboardRoute;
