import { ROUTES } from "@/Constants/Common/RouteConstant";
import { selectIsAuthenticated } from "@/Redux/Features/Auth/Login/LoginSelector";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return children;
};
export default ProtectedRoute;
