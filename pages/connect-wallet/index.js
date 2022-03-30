import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
//axios
import axios from "axios";
//web3-react
import { useWeb3React } from "@web3-react/core";
import { withLayout } from "../../layout/Layout";
import { ConnectWalletPage } from "../../src/page-components/ConnectWalletPage/ConnectWalletPage";
import { login, setAccount } from "../../src/redux/slices/authorizationSlice";
import { setSelect } from "../../src/redux/slices/selectWalletSlice";

const ConnectWallet = () => {
  const { isAuthorized } = useSelector((state) => state.authorization.authorization);
  const { isSelect } = useSelector(state => state.selectWallet)
  const router = useRouter();
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();
  
  console.log(account)
  // useEffect(() => {
  //   console.log('1234567')
  //   if(isSelect && account) {
  //     signMessage()
  //   }
  // }, [isSelect, account, signMessage])

  useEffect(() => {
    if (isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function signMessage() {
    const response = await axios.post(`${process.env.BACKEND_URL}/users/${account}`);
    const nonce = response.data.nonce;
    const msg = `I am signing my one-time nonce: ${nonce}`;
    console.log(library.getSigner())
    library?.getSigner(account).signMessage(msg).then((signature) => {
      handleAuthenticate(signature)
    })
    .catch((error) => {
      dispatch(setSelect(false))
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


  return (
    <>
      <ConnectWalletPage />
    </>
  );
};

export default withLayout(ConnectWallet);
