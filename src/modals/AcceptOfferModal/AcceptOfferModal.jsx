import { useEffect, useState } from "react";
//redux
import { useDispatch } from "react-redux";
import { open } from "../../redux/slices/errorSnackbarSlice";
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
import { ChooseWalletBox } from "../../components/ChooseWalletBox/ChooseWalletBox";
//hooks
import useAuth from "../../hooks/useAuth";
import { useStyles } from "../../hooks/useStyles";
//utils
//styles
import { styles as jsStyles } from "./AcceptOfferModal.utils";
import cssStyles from "./AcceptOfferModal.module.css";

export const AcceptOfferModal = ({ isOpened, handleClose }) => {
  const [acceptantData, setAcceptantData] = useState({
    
  });
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { isAuthorized } = useAuth();

  useEffect

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
              <span>Accept offer</span>
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
            <div className={cssStyles.section}>
              <span>Item</span>
              <span>Subtotal</span>
            </div>
            <div className={cssStyles.section}>
              <div className={cssStyles.userInfoWrapper}>

              </div>
              <div className={cssStyles.priceWrapper}>
              </div>
            </div>
            
            <footer className={cssStyles.footer}>
              <CustButton color="primary" text="Make Offer" />
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
      </Box>
    </Modal>
  );
};
