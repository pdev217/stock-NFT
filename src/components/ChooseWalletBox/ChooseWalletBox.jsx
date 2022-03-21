import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setAccount } from "../../redux/slices/authorizationSlice";
import cn from "classnames";
import Image from "next/image";
import styles from "./ChooseWalletBox.module.css";

export const ChooseWalletBox = ({ className }) => {
  const [choosenWallet, setChoosenWallet] = useState(-1);
  const dispatch = useDispatch();

  const wallets = [
    {
      id: "1",
      name: "Metamask",
      src: "/metamask-fox-wallet.svg",
      connect: connectMetamask,
    },
    {
      id: "2",
      name: "Coinbase",
      src: "/coinbase-wallet.svg",
      connect: connectCoinbase,
    },
    {
      id: "3",
      name: "WalletConnect",
      src: "/walletconnect-wallet.svg",
      connect: connectWalletConnect,
    },
    {
      id: "4",
      name: "Formatic",
      src: "/formatic-wallet.svg",
      isActive: false,
    },
  ];

  return (
    <div className={className}>
      {wallets.map(({ id, src, name }, index) => (
        <div
          key={id}
          className={cn(styles.wallet, {
            [styles.choosenWallet]: choosenWallet === index,
          })}
        >
          <Image src={src} alt={name} height={31} width={31} />
          <p className={styles.walletName}>{name}</p>
          {name === "Metamask" && <p className={styles.popular}>Popular</p>}
        </div>
      ))}
      <div className={styles.moreOptionsWrapper}>
        <p className={styles.moreOptionsText}>Show more options</p>
      </div>
    </div>
  );
};
