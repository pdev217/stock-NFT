import { useState } from "react";
import { open } from "../../redux/slices/errorSnackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Image from "next/image";
//style
import styles from "./ChooseWalletBox.module.css";
//@web3/react
import { useWeb3React } from "@web3-react/core";
//connectors
import { injected, coinbaseWallet, walletConnect } from "../../connectors";
import axios from 'axios'
//redux
import { login } from "../../redux/slices/authorizationSlice";
//web3
import Web3 from "web3";

export const ChooseWalletBox = ({ className }) => {
  const dispatch = useDispatch();

  const { activate, active, account, library } = useWeb3React();
  const [isSelect, setIsSelect] = useState();

  const onConnect = async (connector, id) => {
    setIsSelect(true)
    if(id === "1") {
      if(!window.ethereum || !window.ethereum?.isMetaMask ) {
          dispatch(open("Please install Metamask Chrome extension")); 
          setIsSelect(false)
      }else {
        activate(connector)
        .catch((err) => {
          setIsSelect(false)
        })
      }
    }else {
      activate(connector)
      .then(() => dispatch(setSelect(false)))
      .catch((err) => {
        setIsSelect(false)
      })
    }
  }

  const connect = async (connector, id) => {
    await onConnect(connector, id)
    signMessage()
  }

  const web3 = new Web3(Web3.givenProvider);

  async function signMessage() {
    const accounts = await web3.eth.getAccounts()
    const response = await axios.post(`${process.env.BACKEND_URL}/users/${accounts[0]}`);
    const nonce = response.data.nonce;
    const msg = `I am signing my one-time nonce: ${nonce}`;

    const signature = await web3.eth.personal.sign(
      web3.utils.utf8ToHex(msg),
      address,
    )

    handleAuthenticate(signature, accounts[0])
  }

  const handleAuthenticate = async (signature, address) => {
    const tokenRes = await axios.post(`${process.env.BACKEND_URL}/auth`, {
      publicAddress: address,
      signature,
    });
    localStorage.setItem("accessToken", tokenRes.data);
    dispatch(login());
  };

  const wallets = [
    {
      id: "1",
      name: "Metamask",
      src: "/metamask-fox-wallet.svg",
      connector: injected
    },
    {
      id: "2",
      name: "Coinbase",
      src: "/coinbase-wallet.svg",
      connector: coinbaseWallet
    },
    {
      id: "3",
      name: "WalletConnect",
      src: "/walletconnect-wallet.svg",
      connector: walletConnect
    },
  ];

  return (
    <div className={className}>
      {wallets.map(({ id, src, name, connector }) => (
        <button
          key={id}
          className={cn(styles.wallet)}
          onClick={() => connect(connector, id)}
          disabled={isSelect}
        >
          <Image src={src} alt={name} height={31} width={31} />
          <p className={styles.walletName}>{name}</p>
          {name === "Metamask" && <p className={styles.popular}>Popular</p>}
        </button>
      ))}
    </div>
  );
};