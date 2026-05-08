import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";
import ChatFloat from "./ChatFloat";

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export default Layout;
