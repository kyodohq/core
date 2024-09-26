import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useCheckIdentity } from "@/hooks/useCheckIdentity";
import { useAuth } from "@/stores/authStore";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isError } = useCheckIdentity();
  const { isAuthenticated } = useAuth();

  if (isError) {
    <Navigate to="/signin" replace />;
  }

  return isAuthenticated ? <Outlet /> : null;
};
