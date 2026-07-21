import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import { selectAuthRole, selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import { ROUTES } from "@/Constants/RouteConstant";

const CustomerRouteGuard = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentRole = useSelector(selectAuthRole);

  if (isAuthenticated && ["admin", "cashier"].includes(currentRole)) {
    return <Navigate to={ROUTES.DASHBOARD.HOME} replace />;
  }

  return children;
};

export default CustomerRouteGuard;
