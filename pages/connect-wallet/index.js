import { ethers } from "ethers";
import { ConnectWalletPage } from "../../src/page-components/ConnectWalletPage/ConnectWalletPage";
import { withLayout } from "../../layout/Layout";
import { useEffect } from "react";

const ConnectWallet = () => {
  return (
    <>
      <ConnectWalletPage />
    </>
  );
};

export default withLayout(ConnectWallet);