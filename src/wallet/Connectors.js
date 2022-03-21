import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/263fc8dedbbe4c6d9c2d1100b5928b24`,
    appName: "web3-react-demo"
  });

export const WalletConnect = new WalletConnectConnector({
  infuraId: `https://mainnet.infura.io/v3/263fc8dedbbe4c6d9c2d1100b5928b24`,
  rpcUrl: `https://mainnet.infura.io/v3/263fc8dedbbe4c6d9c2d1100b5928b24`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
