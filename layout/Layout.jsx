import cn from "classnames";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
import { WalletPopup } from "../src/components/WalletPopup/WalletPopup";

const fakeWallets = [
  {
      id: '§12§12',
      name: 'Metamask',
      src: '/metamask-fox-wallet.svg',
  },
  {
      id: 'wqv25b',
      name: 'Coinbase',
      src: '/coinbase-wallet.svg',
  },
  {
      id: '34b3b6',
      name: 'WalletConnect',
      src: '/walletconnect-wallet.svg',
  },
  {
      id: 'ev5w4vu',
      name: 'Formatic',
      src: '/formatic-wallet.svg',
  },
]

const Layout = ({ children }) => {
  const walletPopupIsActive = true;
  const shadowBackgroundIsActive = true;

  return (
    <Provider store={store}>
      <Header isAuthorised={false} />
      <div className={styles.pusherDown}></div>
      <div className={styles.withoutHeader}>
        <div>{children}</div>
        <Footer />
        <div
          className={cn(styles.shadowBackground, {
            [styles.shadowBackgroundActive]: shadowBackgroundIsActive,
          })}
        >
          <WalletPopup
            className={cn(styles.walletPopup, {
              [styles.walletPopupIsActive]: walletPopupIsActive,
            })}
            wallets={fakeWallets}
            isAuthorised={false}
          />
        </div>
      </div>
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
