import { useState } from "react";
import styles from "./ConnectWalletPage.module.css";
import Link from "next/link";
import { wallets } from "./ConnectWalletPage.utils";
import Image from "next/image";
import cn from "classnames";

export const ConnectWalletPage = () => {
  const [choosenWallet, setChoosenWallet] = useState(-1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.centralInfo}>
        <h2 className={styles.title}>Connect your wallet.</h2>
        <p className={styles.prompt}>
          Connect with one of our available{" "}
          <Link href="#" passHref>
            <span className={styles.walletLink}>wallet</span>
          </Link>{" "}
          providers or create a new one.
        </p>
        <div className={styles.chooseWalletWrapper}>
          {wallets.map((wallet, index) => (
            <div
              key={wallet.id}
              className={cn(styles.wallet, {
                [styles.choosenWallet]: choosenWallet === index,
              })}
              onClick={() => setChoosenWallet(index)}
            >
              <Image
                src={wallet.src}
                alt={wallet.name}
                height={31}
                width={31}
              />
              <p className={styles.walletName}>{wallet.name}</p>
              {wallet.name === "Metamask" && (
                <p className={styles.popular}>Popular</p>
              )}
            </div>
          ))}
          <div className={styles.moreOptionsWrapper}>
            <p className={styles.moreOptionsText}>Show more options</p>
          </div>
        </div>
      </div>
    </div>
  );
};
