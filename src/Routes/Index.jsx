/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "@/Redux/Store";

import TenantProvider from "@/Features/Shared/Context/TenantContext";
import RootErrorBoundary from "@/Pages/RootErrorBoundary";
import DashboardRoute from "@/Routes/DashboardRoute";
import PublicRoute from "@/Routes/PublicRoute";
import NotFound from "@/Pages/NotFound";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <TenantProvider>
        <RouterProvider router={Routes} fallbackElement={<RootErrorBoundary />} />
      </TenantProvider>
    </Provider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
