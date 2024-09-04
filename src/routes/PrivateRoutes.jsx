import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
  );
};

export default PrivateRoutes;
