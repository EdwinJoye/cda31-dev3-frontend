import { Outlet } from "react-router-dom";
import { HeaderMegaMenu } from "../components/HeaderMegaMenu/HeaderMegaMenu";

export const MainLayout = () => {
  return (
    <>
      <HeaderMegaMenu />
      <main>
        <Outlet />
      </main>
    </>
  );
};
