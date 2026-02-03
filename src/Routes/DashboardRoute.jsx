import { SidebarProvider } from "@/Components/Elements/Shadcn/Sidebar/sidebar";
import DashLayout from "@/Components/Layouts/DashLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const PanelProduct = lazy(() => import("@/Pages/Dashboard/Product/PanelProduct"));

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
    path: "/dashboard/products",
    element: createProtectedRoute(<PanelProduct />),
  },
];

export default DashboardRoute;
