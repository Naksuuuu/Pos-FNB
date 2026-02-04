// import App from "@/Pages/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import PublicRoute from "./PublicRoute";
import { Provider } from "react-redux";
import store from "@/Redux/Store";

const RootErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    errorElement: <RootErrorBoundary />,
  },
  ...PublicRoute,
  ...DashboardRoute,
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={Routes} fallbackElement={<RootErrorBoundary />} />
  </Provider>
);

createRoot(document.getElementById("root")).render(<App />);
