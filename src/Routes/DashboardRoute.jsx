import { SidebarProvider } from "@/Components/Elements/Shadcn/Sidebar/sidebar";
import DashLayout from "@/Components/Layouts/DashLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const PanelMenu = lazy(() => import("@/Pages/Dashboard/Menu/PanelMenu"));

const createProtectedRoute = (component) => {
  return (
    <SidebarProvider>
      <DashLayout>{component}</DashLayout>
    </SidebarProvider>
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
