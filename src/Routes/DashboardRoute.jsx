import { lazy, Suspense } from "react";

import { SidebarProvider } from "@/Components/Elements/Shadcn/Sidebar/sidebar";
import DashLayout from "@/Components/Layouts/DashLayout";

import LoadingApp from "@/Pages/Common/LoadingApp";
const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const PanelMenu = lazy(() => import("@/Pages/Dashboard/Menu/PanelMenu"));

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
    element: createProtectedRoute(<PanelMenu />),
  },
];

export default DashboardRoute;
