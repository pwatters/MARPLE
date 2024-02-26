import { ComponentType } from "react";
import Layout from "../components/Layout";

const withLayout = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  );
};

export default withLayout;
