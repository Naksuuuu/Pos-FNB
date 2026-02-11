import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "@/Redux/Store";
import RootErrorBoundary from "@/Pages/Common/RootErrorBoundary";
import DashboardRoute from "./DashboardRoute";
import PublicRoute from "./PublicRoute";

export const Routes = createBrowserRouter([
  {
    errorElement: <RootErrorBoundary />,
    children: [...PublicRoute, ...DashboardRoute],
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={Routes} fallbackElement={<RootErrorBoundary />} />
  </Provider>
);

createRoot(document.getElementById("root")).render(<App />);
