import { lazy, Suspense } from "react";

import { SidebarProvider } from "@/Components/Elements/Shadcn/sidebar";

import LoadingApp from "@/Pages/Common/LoadingApp";
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const MenuPage = lazy(() => import("@/Pages/Dashboard/Menu/MenuPage"));
const CategoryPage = lazy(() => import("@/Pages/Dashboard/Category/CategoryPage"));
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
    path: "/dashboard/menu",
    element: createProtectedRoute(<MenuPage />),
  },
  {
    path: "/dashboard/category",
    element: createProtectedRoute(<CategoryPage />),
  },
];

export default DashboardRoute;
