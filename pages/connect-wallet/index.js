import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { withLayout } from "../../layout/Layout";
import { ConnectWalletPage } from "../../src/page-components/ConnectWalletPage/ConnectWalletPage";

const ConnectWallet = () => {

  const { isAuthorized } = useSelector((state) => state.authorization.authorization);
  useEffect(() => {
    if (isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized]);

  return (
    <>
      <ConnectWalletPage />
    </>
  );
};

export default withLayout(ConnectWallet);
