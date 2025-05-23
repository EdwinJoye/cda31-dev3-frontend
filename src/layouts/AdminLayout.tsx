import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminLayout = () => {
  const { isAuthenticated, connectedUser } = useAuth();

  if (!isAuthenticated || !connectedUser?.admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminLayout;
