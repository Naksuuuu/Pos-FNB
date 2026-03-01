/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "@/Redux/Store";

import RootErrorBoundary from "@/Pages/Common/RootErrorBoundary";
import DashboardRoute from "@/Routes/DashboardRoute";
import PublicRoute from "@/Routes/PublicRoute";
import NotFound from "@/Pages/Common/NotFound";
import AuthRoute from "@/Routes/AuthRoute";

export const Routes = createBrowserRouter([
  {
    errorElement: <RootErrorBoundary />,
    children: [
      ...PublicRoute,
      ...DashboardRoute,
      ...AuthRoute,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={Routes} fallbackElement={<RootErrorBoundary />} />
  </Provider>
);

createRoot(document.getElementById("root")).render(<App />);
