import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "../components/HeaderMegaMenu/HeaderMegaMenu";

export const MainLayout = () => {
  return (
    <main className="min-h-[100vh] flex flex-col">
      <HeaderMegaMenu />
      <div style={{ height: "calc(100vh - 60px)" }}>
        <Outlet />
      </div>
    </main>
  );
};
