import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export default Layout;
