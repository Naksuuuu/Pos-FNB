import DashLayout from "@/Components/Layouts/DashLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/Pages/Dashboard/Dashboard"));

const createProtectedRoute = (component) => {
  return <DashLayout>{component}</DashLayout>;
};

const DashboardRoute = [
  {
    path: "/dashboard",
    element: createProtectedRoute(<Dashboard />),
  },
];

export default DashboardRoute;
