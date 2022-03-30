import { useState, useRef, useEffect } from "react";
import { open } from "../../redux/slices/errorSnackbarSlice";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Image from "next/image";
//style
import styles from "./ChooseWalletBox.module.css";
//web3/react
import { useWeb3React } from "@web3-react/core";
//connectors
import { injected, coinbaseWallet, walletConnect } from "../../connectors";
//redux
import { setSelect } from "../../redux/slices/selectWalletSlice";
import axios from 'axios'

export const ChooseWalletBox = ({ className }) => {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const { isSelect } = useSelector(state => state.selectWallet)

  const { activate, active, account, library } = useWeb3React();

  const onConnect = async (connector, id) => {
    dispatch(setSelect(true));
    if(id === "1") {
      if(!window.ethereum || !window.ethereum?.isMetaMask ) {
          dispatch(open("Please install Metamask Chrome extension")); 
          dispatch(setSelect(false));
      }else {
        activate(connector)
        .catch((err) => {
          dispatch(setSelect(false));
        })
      }
    }else {
      activate(connector)
      .then(() => dispatch(setSelect(false)))
      .catch((err) => {
        dispatch(setSelect(false));
      })
    }
  }

  async function signMessage() {
    setFlag(true);
    console.log("Account", account)
    const response = await axios.post(`${process.env.BACKEND_URL}/users/${account}`);
    const nonce = response.data.nonce;
    const msg = `I am signing my one-time nonce: ${nonce}`;
    console.log(library?.getSigner())
    library?.getSigner(account).signMessage(msg).then((signature) => {
      handleAuthenticate(signature)
    })
    .catch((error) => {
      dispatch(setSelect(false))
      console.log('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
    })
  }

  const connect = async (connector, id) => {
    onConnect(connector, id)
  }

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

  useEffect(() => {
    if(active && !flag)
      signMessage();
  },[])

  useEffect(() => {
    if(active && !flag)
      signMessage();
  },[account])
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