import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import { selectAuthRole, selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

import { ROUTES } from "@/Constants/Common/RouteConstant";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentRole = useSelector(selectAuthRole);

  const url = new URL(window.location.href);
  const newUrl = `${ROUTES.AUTH.LOGIN}?callbackUrl=${url.pathname}${url.search}`;
  if (!isAuthenticated) return <Navigate to={newUrl} replace />;
  if (!allowedRoles.includes(currentRole)) return <Navigate to={ROUTES.DASHBOARD.HOME} replace />;

  return children;
};
export default ProtectedRoute;
