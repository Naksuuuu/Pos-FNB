import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { selectAuthRole, selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

import LoadingApp from "@/Pages/LoadingApp";
const RegisterPage = lazy(() => import("@/Features/Auth/Register/Pages/RegisterPage"));
const LoginPage = lazy(() => import("@/Features/Auth/Login/Pages/LoginPage"));

const ProtectAuthRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isCustomer = useSelector(selectAuthRole) === "customer";

  if (isAuthenticated) {
    const url = new URL(window.location.href);
    const newUrl = url.searchParams.get("callbackUrl") || (isCustomer ? "/catalog" : "/dashboard");
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
  {
    path: "/auth/register",
    element: createAuthRoute(<RegisterPage />),
  },
];

export default AuthRoute;
