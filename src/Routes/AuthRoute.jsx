import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

import LoadingApp from "@/Pages/Common/LoadingApp";
const LoginPage = lazy(() => import("@/Pages/Auth/Login/LoginPage"));

const ProtectAuthRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
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
