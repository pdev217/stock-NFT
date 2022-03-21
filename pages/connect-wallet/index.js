
import { ConnectWalletPage } from "../../src/page-components/ConnectWalletPage/ConnectWalletPage";
import { withLayout } from "../../layout/Layout";

const ConnectWallet = () => {
  return (
    <>
      <ConnectWalletPage />
    </>
  );
};

export default withLayout(ConnectWallet);
