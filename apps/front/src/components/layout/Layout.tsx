import { useCheckIdentity } from "@/hooks/useCheckIdentity";
import { Navigate, Outlet } from "react-router-dom";
import { DynamicMenu } from "./DynamicMenu";

export const Layout = () => {
  const { isError } = useCheckIdentity();

  if (isError) {
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
    </>
  );
};
