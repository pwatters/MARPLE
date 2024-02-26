import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
