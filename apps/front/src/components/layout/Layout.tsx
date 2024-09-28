import { useCheckIdentity } from "@/hooks/useCheckIdentity";
import { Navigate, Outlet } from "react-router-dom";
import { DynamicMenu } from "./DynamicMenu";
import { LogoutButton } from "./LogoutButton";
import { useAuth } from "@/stores/authStore";

const ENVIRONMENT = import.meta.env.NODE_ENV;

export const Layout = () => {
  const { isError, isLoading } = useCheckIdentity();
  const { isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (isError && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <div
        className="w-screen h-6 bg-white/0 fixed top-0 z-[9999]"
        data-tauri-drag-region
      />
      <Outlet />
      <DynamicMenu />
      {ENVIRONMENT !== "production" && <LogoutButton />}
    </>
  );
};
