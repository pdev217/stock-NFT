import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Image from "next/image";
import { login, setAccount } from "../../redux/slices/authorizationSlice";
import { useRouter } from "next/router";
import { open } from "../../redux/slices/errorSnackbarSlice";
//web3
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletLink from "walletlink";
import WalletConnect from "@walletconnect/web3-provider";
//axios
import axios from "axios";
//style
import styles from "./ChooseWalletBox.module.css";

export const ChooseWalletBox = ({ className }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const { isAuthorized } = useSelector((state) => state.authorization.authorization.isAuthorized);

  const getProviderOptions = () => {
    const infuraId = process.env.INFURA_ID;
    console.log("InfuraId: " + infuraId);
    const providerOptions = {
      walletlink: {
        package: WalletLink,
        options: {
          appName: "Stoke NFT",
          infuraId: infuraId,
        },
      },
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId: infuraId,
        },
      },
    };
    return providerOptions;
  };

  let web3Modal;
  if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
      disableInjectedProvider: false,
      cacheProvider: true,
      providerOptions: getProviderOptions(), // required
    });
  }

  const onConnect = async (walletProvider) => {
    setConnected(true);
    let provider;
    if (walletProvider == "injected") {
      if (!window.ethereum) {
        dispatch(open("Please install Metamask Chrome extension"));
        setConnected(false);
      } else {
        if (window.ethereum.providers) {
          provider = await window.ethereum.providers.find(({ isMetaMask }) => isMetaMask); // prevent both metamask and coinbase.
        } else {
          provider = window.ethereum; //when only metamask exit.
        }
        await provider.enable();
      }
    } else {
      provider = await web3Modal.connectTo(walletProvider).catch((err) => {
        console.log(err.message);
        setConnected(false);
      });
    }
    if (provider) {
      console.log(provider);
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const balance = await web3.eth.getBalance(address); //symbol is eth
      console.log("connected: " + address);

      //signature
      console.log(process.env.BACKEND_URL);
      const response = await axios.post(`${process.env.BACKEND_URL}/users/${address}`);
      console.log(response);
      const nonce = response.data.nonce;
      const user = {
        publicAddress: address,
        balance,
        // web3,
        userName: response.data.username,
      };

      signMessage(web3, address, nonce).then((signature) => {
        dispatch(setAccount(user));
        console.log("--- account set---");
        handleAuthenticate(address, signature);
      });
    }
  };

  const signMessage = (web3, address, nonce) => {
    return web3.eth.personal
      .sign(web3.utils.utf8ToHex(`I am signing my one-time nonce: ${nonce}`), address)
      .catch((err) => console.log(err.message));
  };

  const handleAuthenticate = async (address, signature) => {
    const tokenRes = await axios.post(`${process.env.BACKEND_URL}/auth`, {
      publicAddress: address,
      signature,
    });
    localStorage.setItem("accessToken", tokenRes.data);
    dispatch(login());
    // we don't know if this message is needed
    //alert("you have been logged in successfully");
  };

  useEffect(() => {
    if (isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized, router]);

  const wallets = [
    {
      id: "1",
      name: "Metamask",
      src: "/metamask-fox-wallet.svg",
      providerOption: "injected",
    },
    {
      id: "2",
      name: "Coinbase",
      src: "/coinbase-wallet.svg",
      providerOption: "walletlink",
    },
    {
      id: "3",
      name: "WalletConnect",
      src: "/walletconnect-wallet.svg",
      providerOption: "walletconnect",
    },
  ];

  return (
    <div className={className}>
      {wallets.map(({ id, src, name, providerOption }) => (
        <button
          key={id}
          className={cn(styles.wallet)}
          disabled={connected}
          onClick={() => onConnect(providerOption)}
        >
          <Image src={src} alt={name} height={31} width={31} />
          <p className={styles.walletName}>{name}</p>
          {name === "Metamask" && <p className={styles.popular}>Popular</p>}
        </button>
      ))}
    </div>
  );
};
