import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ChooseWalletBox } from "../ChooseWalletBox/ChooseWalletBox";
import styles from "./WalletPopup.module.css";

export const WalletPopup = ({ className, isAuthorised, wallets }) => (
  <>
    {console.log(wallets)}
    {isAuthorised ? (
      <></>
    ) : (
      <div className={cn(className, styles.wrapper)}>
        <div className={styles.title}>
          <Image
            src="/wallet-icon.svg"
            height={24}
            width={24}
            alt="wallet-icon"
          />
          <div className={styles.titleText}>My Wallet</div>
        </div>
        <div className={styles.prompt}>
          Connect with one of our available{" "}
          <Link href="#" passHref>
            <span className={styles.walletLink}>wallet</span>
          </Link>{" "}
          providers or create a new one.
        </div>
        <ChooseWalletBox
          className={styles.chooseWalletBox}
          choosenWallet={-1}
          wallets={wallets}
          setChoosenWallet={() => {}}
        />
      </div>
    )}
  </>
);
