import { useEffect, useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//axios
import axios from "axios";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, MenuItem, TextField, Checkbox } from "@mui/material";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { ComposedTextField } from "./ComposedTextField";
import { ChooseWalletBox } from "../../components/ChooseWalletBox/ChooseWalletBox";
//hooks
import useAuth from "../../hooks/useAuth";
import { useStyles } from "../../hooks/useStyles";
//utils
import { daysSelectArray, getExpirationDate } from "./MakeOfferModal.utils";
//styles
import { styles as jsStyles } from "./MakeOfferModal.utils";
import cssStyles from "./MakeOfferModal.module.css";
import { TransferApprovalModal } from "../TransferApprovalModal/TransferApprovalModal";
import { styles } from "../../components/CustButton/CustButton.utils";
//contract
import stokeNFTArtifacts from "../../../artifacts/contracts/StokeNFT.sol/StokeNFT.json";
import tokenArtifacts from "../../../artifacts/contracts/WETH.sol/WETH9.json";
import { injected } from "../../connectors";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

Date.prototype.toDateInputValue = function () {
  const local = new Date(this);
  let hours = local.getHours();
  let minutes = local.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};

const tokenAddr = "0x194194b1D78172446047e327476B811f5D365c21";

export const MakeOfferModal = ({ isOpened, handleClose }) => {
  const { isAuthorized } = useAuth();
  const { account, activate, library } = useWeb3React();
  const [disabledButton, setDisabledButton] = useState(true);
  const [balance, setBalance] = useState(0);
  const [modalData, setModalData] = useState({
    currency: "ETH",
    amount: undefined,
    pricePerItem: undefined,
    offerExpirationDays: "3 days",
    offerExpirationTime: new Date().toDateInputValue(),
    agreed: false,
  });
  const muiClasses = useStyles();

  const sendOfferToServer = async () => {
    const {
      query: { tokenId },
    } = router;

    const { offerExpirationDays, offerExpirationTime, pricePerItem } = modalData;
    const expirationDate = getExpirationDate(offerExpirationDays, offerExpirationTime);
    let response;
    try {
      const accessToken = localStorage.getItem("accessToken");

      response = await axios.post(
        `${process.env.BACKEND_URL}/offers`,
        {
          price: Number(pricePerItem),
          expirationDate,
          nftId: Number(tokenId),
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
    return response;
  };
  useEffect(() => {}, [balance]);

  const handleMakeOffer = async () => {
    const IToken = new ethers.ContractFactory(
      tokenArtifacts.abi,
      tokenArtifacts.deployedBytecode,
      library?.getSigner()
    );
    const tokenContract = IToken.attach(tokenAddr);
    const tokenBalanceWei = await tokenContract.balanceOf(account);
    const tokenBalance = ethers.utils.formatEther(tokenBalanceWei);
    console.log(tokenBalance);
    // console.log(tokenContract);
    // await tokenContract.deposit({from:account, value:ethers.utils.parseUnits(String(0.01), 18)});
    if (true) {
      setIsTransferApprovalModalOpened(true);
    } else {
      sendOfferToServer();
    }
  };

  useEffect(() => {
    if (
      modalData.currency &&
      modalData.amount &&
      modalData.pricePerItem &&
      modalData.agreed &&
      (modalData.offerExpirationDays !== "None" || modalData.offerExpirationTime)
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [{ ...modalData }]);

  useEffect(() => {
    if (modalData.amount < 1) setModalData({ ...modalData, amount: 1 });
  }, [modalData.amount]);

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
        {isAuthorized ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
              <span>Make an offer</span>
              <div className={cssStyles.cross} onClick={handleClose}>
                <Image
                  src="/create-nft/Icon-Close.svg"
                  alt="close-icon"
                  width={15}
                  height={15}
                  onClick={handleClose}
                />
              </div>
            </Typography>
            <section className={cssStyles.section}>
              Price
              <ComposedTextField modalData={modalData} setModalData={setModalData} />
              <div className={cssStyles.balance}>
                <span>
                  Balance: {balance} WETH
                </span>
              </div>
              <div className={cssStyles.offerExpiration}>
                <span>Offer Expiration</span>
              </div>
              <div className={cssStyles.dateSelectsWrapper}>
                <Select
                  fullWidth
                  id=""
                  type="number"
                  variant="outlined"
                  IconComponent={() => (
                    <div style={{ right: "16px", position: "absolute", pointerEvents: "none" }}>
                      <Image src="/view-token/Icon:ArrowDown.svg" height={8} width={16} alt="arrow-up" />
                    </div>
                  )}
                  sx={{ width: "30%", maxHeight: "56px", color: "white" }}
                  className={muiClasses.select}
                  value={modalData.offerExpirationDays}
                  InputLabelProps={{
                    style: { color: "var(--shadow)" },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "250px",
                      },
                    },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  onChange={({ target: { value } }) =>
                    setModalData({ ...modalData, offerExpirationDays: value })
                  }
                >
                  {daysSelectArray.map((elem) => (
                    <MenuItem key={elem} value={elem}>
                      <span>{elem}</span>
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  id=""
                  type="time"
                  variant="outlined"
                  sx={{
                    width: "67.5%",
                    marginLeft: "2.5%",
                    '& input[type="time"]::-webkit-calendar-picker-indicator': {
                      filter: "invert(100%) sepia(0%)",
                    },
                  }}
                  className={muiClasses.textField}
                  value={modalData.offerExpirationTime}
                  onChange={({ target: { value } }) =>
                    setModalData({ ...modalData, offerExpirationTime: value })
                  }
                  InputLabelProps={{
                    style: { color: "var(--shadow)" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
              <div className={cssStyles.termsOfService}>
                <Checkbox
                  sx={{
                    color: "var(--light-grey)",
                    "&.Mui-checked": {
                      color: "var(--light-grey)",
                    },
                    position: "relative",
                    bottom: "1px",
                  }}
                  checked={modalData.agreed}
                  onChange={({ target: { checked } }) => setModalData({ ...modalData, agreed: checked })}
                />
                <span className={cssStyles.marginLeft8}>
                  By checking this box, I agree to{" "}
                  <Link href="" passHref>
                    <span className={cssStyles.link}>Stoke’s Terms of Service</span>
                  </Link>
                </span>
              </div>
            </section>
            <footer className={cssStyles.footer}>
              <CustButton
                color="primary"
                disabled={disabledButton}
                onClick={() => handleMakeOffer()}
                text="Make Offer"
              />
            </footer>
          </>
        ) : (
          <div className={cssStyles.chooseBoxWrapper}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
              <span>Please connect wallet</span>
              <div className={cssStyles.cross} onClick={handleClose}>
                <Image
                  src="/create-nft/Icon-Close.svg"
                  alt="close-icon"
                  width={15}
                  height={15}
                  onClick={handleClose}
                />
              </div>
            </Typography>
            <ChooseWalletBox />
          </div>
        )}
        <TransferApprovalModal
          isOpened={isTransferApprovalModalOpened}
          handleClose={() => setIsTransferApprovalModalOpened(false)}
          setIsMakeOfferModalOpened={isOpened}
          sendOfferToServer={sendOfferToServer}
        />
      </Box>
    </Modal>
  );
};
