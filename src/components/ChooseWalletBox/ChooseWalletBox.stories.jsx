import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { ChooseWalletBox } from "./ChooseWalletBox";

export default {
  title: "ChooseWalletBox",
  component: ChooseWalletBox,
};

const wallets = [
  {
    id: "§12§12",
    name: "Metamask",
    src: "/metamask-fox-wallet.svg",
    isActive: false,
  },
  {
    id: "wqv25b",
    name: "Coinbase",
    src: "/coinbase-wallet.svg",
    isActive: false,
  },
  {
    id: "34b3b6",
    name: "WalletConnect",
    src: "/walletconnect-wallet.svg",
    isActive: false,
  },
  {
    id: "ev5w4vu",
    name: "Formatic",
    src: "/formatic-wallet.svg",
    isActive: false,
  },
];

const Template = (args) => (
  <Provider store={store}>
    <div style={{ background: "black" }}>
      <ChooseWalletBox {...args} />
    </div>
  </Provider>
);

export const Normal = Template.bind({});

Normal.args = {
  choosenWallet: 0,
  wallets,
  setChoosenWallet: () => {
    console.log("wallet choosen");
  },
};
