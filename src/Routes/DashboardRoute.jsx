import { lazy, Suspense } from "react";

import LoadingApp from "@/Pages/Common/LoadingApp";
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const MenuPage = lazy(() => import("@/Pages/Dashboard/Menu/MenuPage"));
const CategoryPage = lazy(() => import("@/Pages/Dashboard/Category/CategoryPage"));
const DiningTablePage = lazy(() => import("@/Pages/Dashboard/DiningTable/DiningTablePage"));

const SidebarProvider = lazy(() => import("@/Components/Elements/Shadcn/sidebar").then((m) => ({ default: m.SidebarProvider })));
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
    path: "/dashboard",
    element: createProtectedRoute(<Dashboard />),
  },
  {
    path: "/dashboard/cashier",
    element: createProtectedRoute(<PanelCashier />),
  },
  {
    path: "/dashboard/inventory/menu",
    element: createProtectedRoute(<MenuPage />),
  },
  {
    path: "/dashboard/inventory/menu/category",
    element: createProtectedRoute(<CategoryPage />),
  },
  {
    path: "/dashboard/inventory/table",
    element: createProtectedRoute(<DiningTablePage />),
  },
];

export default DashboardRoute;
