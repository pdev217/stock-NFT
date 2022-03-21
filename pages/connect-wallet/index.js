import { useWeb3React } from "@web3-react/core";
import {
  injected,
  CoinbaseWallet,
  WalletConnect,
} from "../../src/wallet/Connectors";
import { ConnectWalletPage } from "../../src/page-components/ConnectWalletPage/ConnectWalletPage";
import { withLayout } from "../../layout/Layout";

const ConnectWallet = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connectMetamask() {
    try {
      await activate(injected);
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function connectWalletConnect() {
    try {
      await activate(WalletConnect);
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function connectCoinbase() {
    try {
      await activate(CoinbaseWallet);
      console.log("---active", active);
      console.log("---account", account);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <ConnectWalletPage />
      <div style={{ color: "white" }}>
        <button onClick={connectMetamask}>connect Metamask</button>
        <button onClick={disconnect}>disconnect</button>
        {active ? (
          <span style={{ color: "white" }}>
            Metamask.Connected with <b style={{ color: "white" }}>{account}</b>
          </span>
        ) : (
          <span style={{ color: "white" }}>Metamask. Not connected</span>
        )}
      </div>
      <div style={{ color: "white" }}>
        <button onClick={connectWalletConnect}>connect WC</button>
        <button onClick={disconnect}>disconnect</button>
      </div>
      <div style={{ color: "white" }}>
        <button onClick={connectCoinbase}>connect Coinbase</button>
        <button onClick={disconnect}>disconnect</button>
      </div>
    </>
  );
};

export default withLayout(ConnectWallet);
