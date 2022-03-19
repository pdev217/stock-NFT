import { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import styles from "./ChooseWalletBox.module.css";

export const ChooseWalletBox = ({ className, wallets }) => {
  const [choosenWallet, setChoosenWallet] = useState(-1);

  return (
    <div className={className}>
      {wallets.map((wallet, index) => (
        <div
          key={wallet.id}
          className={cn(styles.wallet, {
            [styles.choosenWallet]: choosenWallet === index,
          })}
          onClick={() => setChoosenWallet(index)}
        >
          <Image src={wallet.src} alt={wallet.name} height={31} width={31} />
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
  );
};
