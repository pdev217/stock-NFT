import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authorizationSlice";
import {
  injected,
  CoinbaseWallet,
  WalletConnect,
} from "../../wallet/Connectors";
import cn from "classnames";
import Image from "next/image";
import styles from "./ChooseWalletBox.module.css";

export const ChooseWalletBox = ({ className }) => {
  const [choosenWallet, setChoosenWallet] = useState(-1);
  const { active, account, activate, deactivate } =
    useWeb3React();
  const dispatch = useDispatch();

  async function connectMetamask() {
    try {
      setChoosenWallet(0);
      await activate(injected);
      active && dispatch(login());
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function connectWalletConnect() {
    try {
      setChoosenWallet(2)
      await activate(WalletConnect);
      active && dispatch(login());
    } catch (ex) {
      console.log(ex);
    }
  }

  async function connectCoinbase() {
    try {
      setChoosenWallet(1)
      await activate(CoinbaseWallet);
      active && dispatch(login());
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  const wallets = [
    {
      id: "1",
      name: "Metamask",
      src: "/metamask-fox-wallet.svg",
      connect: connectMetamask
    },
    {
      id: "2",
      name: "Coinbase",
      src: "/coinbase-wallet.svg",
      connect: connectCoinbase
    },
    {
      id: "3",
      name: "WalletConnect",
      src: "/walletconnect-wallet.svg",
      connect: connectWalletConnect
    },
    {
      id: "4",
      name: "Formatic",
      src: "/formatic-wallet.svg",
      isActive: false,
    },
  ];

  async function disconnect() {
    try {
      deactivate();
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className={className}>
      {wallets.map(({id, connect, src, name }, index) => (
        <div
          key={id}
          className={cn(styles.wallet, {
            [styles.choosenWallet]: choosenWallet === index,
          })}
          onClick={connect}
        >
          <Image src={src} alt={name} height={31} width={31} />
          <p className={styles.walletName}>{name}</p>
          {name === "Metamask" && (
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
