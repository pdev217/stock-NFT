import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header isAuthorised={false} />
      <div className={styles.childrenWrapper}></div>
      <div>{children}</div>
      <Footer />
    </>
  );
};

export const withLayout = (Component) => {
  return function withLayoutComponent(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
