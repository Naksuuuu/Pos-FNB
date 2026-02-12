import { lazy, Suspense } from "react";

import { SidebarProvider } from "@/Components/Elements/Shadcn/Sidebar/sidebar";

import LoadingApp from "@/Pages/Common/LoadingApp";
const DashLayout = lazy(() => import("@/Components/Layouts/DashLayout"));
const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const DashboardMenu = lazy(() => import("@/Pages/Dashboard/Menu/DashboardMenu"));

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
    element: createProtectedRoute(<DashboardMenu />),
  },
];

export default DashboardRoute;
