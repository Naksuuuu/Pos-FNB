import DashLayout from "@/Components/Layouts/DashLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));
const PanelCashier = lazy(() => import("@/Pages/Dashboard/Cashier/PanelCashier"));
const PanelProduct = lazy(() => import("@/Pages/Dashboard/Product/PanelProduct"));

const createProtectedRoute = (component) => {
  return <DashLayout>{component}</DashLayout>;
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
    path: "/dashboard/inventory/products",
    element: createProtectedRoute(<PanelProduct />),
  },
];

export default DashboardRoute;
