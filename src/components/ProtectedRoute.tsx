import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = () => {
  const { data } = useUser();

  if (!data?.data?.user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
