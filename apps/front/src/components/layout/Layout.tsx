import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div
        className="w-screen h-6 bg-white/0 fixed top-0 z-[9999]"
        data-tauri-drag-region
      />
      <Outlet />
    </>
  );
};
