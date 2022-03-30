import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setAccount } from "../../redux/slices/authorizationSlice";
import { open } from "../../redux/slices/errorSnackbarSlice";
import { useRouter } from "next/router";
import cn from "classnames";
import Image from "next/image";
//style
import styles from "./ChooseWalletBox.module.css";
//axios
import axios from "axios";
//web3/react
import { useWeb3React } from "@web3-react/core";
//connectors
import { injected, coinbaseWallet, walletConnect } from "../../connectors";

let i = 0

export const ChooseWalletBox = ({ className }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const { isAuthorized } = useSelector((state) => state.authorization.authorization);

  const { activate, account, active, library } = useWeb3React();

  const onConnect = (connector, id) => {
    setConnected(true)
    if(id === "1") {
      if(!window.ethereum || !window.ethereum?.isMetaMask ) {
        console.log(id)
          dispatch(open("Please install Metamask Chrome extension")); 
          setConnected(false)
      }else {
        activate(connector)
        .catch((err) => {
          setConnected(false)
          console.log(err)
        })
      }
    }else {
      activate(connector)
      .then(() => {
        setConnected(false)
      })
      .catch((err) => {
        console.log(err)
        setConnected(false)
      })
    }
  }

  useEffect(() => {
    if(router.pathname === '/connect-wallet') {
      if(account && i%2 === 0) {
        signMessage();
      }
    }else {
      signMessage()
    }
    i++
  }, [account])
  
  async function signMessage() {
    const response = await axios.post(`${process.env.BACKEND_URL}/users/${account}`);
    const nonce = response.data.nonce;
    const msg = `I am signing my one-time nonce: ${nonce}`;
    library?.getSigner(account).signMessage(msg).then((signature) => {
      handleAuthenticate(signature)
    })
    .catch((error) => {
      setConnected(false)
      console.log('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
    })
  }

  const handleAuthenticate = async (signature) => {
    const tokenRes = await axios.post(`${process.env.BACKEND_URL}/auth`, {
      publicAddress: account,
      signature,
    });
    localStorage.setItem("accessToken", tokenRes.data);
    dispatch(login());
  };

  useEffect(() => {
    if (isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized]);

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
          disabled={connected}
          onClick={() => onConnect(connector, id)}
        >
          <Image src={src} alt={name} height={31} width={31} />
          <p className={styles.walletName}>{name}</p>
          {name === "Metamask" && <p className={styles.popular}>Popular</p>}
        </button>
      ))}
    </div>
  );
};