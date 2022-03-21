import cn from "classnames";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../src/redux/store";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
import { WalletPopup } from "../src/components/WalletPopup/WalletPopup";
const fakeWallets = [
  {
    id: "§12§12",
    name: "Metamask",
    src: "/metamask-fox-wallet.svg",
  },
  {
    id: "wqv25b",
    name: "Coinbase",
    src: "/coinbase-wallet.svg",
  },
  {
    id: "34b3b6",
    name: "WalletConnect",
    src: "/walletconnect-wallet.svg",
  },
  {
    id: "ev5w4vu",
    name: "Formatic",
    src: "/formatic-wallet.svg",
  },
];

const Layout = ({ children }) => {
  const isWalletPopupOpened = useSelector(
    (state) => state.walletPopup.walletPopup.isOpened
  );

  const isAuthorized = useSelector(
    (state) => { 
      return state.authorization.authorization.isAuthorized}
  );
  console.log('---isAuthorized', isAuthorized)

  return (
    <>
      <Header isAuthorized={isAuthorized} />
      <div className={styles.pusherDown}></div>
      <div className={styles.withoutHeader}>
        <div>{children}</div>
        <Footer />
        <div
          className={cn(styles.shadowBackground, {
            [styles.shadowBackgroundActive]: isWalletPopupOpened,
          })}
        >
          <WalletPopup
            className={cn(styles.walletPopup, {
              [styles.walletPopupIsActive]: isWalletPopupOpened,
            })}
            wallets={fakeWallets}
            isAuthorized={isAuthorized}
          />
        </div>
      </div>
    </>
  );
};

export const withLayout = (Component) => {
  return function withLayoutComponent(props) {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...props} />
        </Layout>
      </Provider>
    );
  };
};
