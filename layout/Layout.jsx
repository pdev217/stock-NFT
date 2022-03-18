import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <Header isAuthorised={false} />
      <div className={styles.childrenWrapper}></div>
      <div>{children}</div>
      <Footer />
    </Provider>
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
