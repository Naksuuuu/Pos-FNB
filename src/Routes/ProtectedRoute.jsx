import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";

import { ROUTES } from "@/Constants/Common/RouteConstant";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return children;
};
export default ProtectedRoute;
