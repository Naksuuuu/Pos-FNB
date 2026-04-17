import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

import LoadingApp from "@/Pages/LoadingApp";
const LoginPage = lazy(() => import("@/Features/Auth/Login/Pages/LoginPage"));

const ProtectAuthRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    const url = new URL(window.location.href);
    const newUrl = url.searchParams.get("callbackUrl") || "/dashboard";
    return <Navigate to={newUrl} replace />;
  }

  return children;
};

const createAuthRoute = (component) => {
  return (
    <Suspense fallback={<LoadingApp />}>
      <ProtectAuthRoute>{component}</ProtectAuthRoute>
    </Suspense>
  );
};

const AuthRoute = [
  {
    path: "/auth/login",
    element: createAuthRoute(<LoginPage />),
  },
];

export default AuthRoute;
