//next
import Image from "next/image";
//redux
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../redux/slices/successfulOrderSlice";
//mui
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//styles
import { styles as jsStyles } from "../AddToNFTModal/AddToNFTModal.utils";
import cssStyles from "./SuccessfulOrderModal.module.css";

export const SuccessfulOrderModal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.successfulOrderModal.isOpened);

  const handleClose = () => {
    dispatch(close());
  };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
        <div style={{ display: "flex", padding: "24px", justifyContent: "flex-end" }}>
          <div onClick={handleClose} style={{ cursor: "pointer", width: "15px" }}>
            <Image src="/create-nft/Icon-Close.svg" alt="close-icon" width={15} height={15} />
          </div>
        </div>
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image src="/view-token/Icon_Success.svg" width={62} height={64} alt="success-icon" />
          <span className={cssStyles.whiteText}>Your order was successfully placed</span>
          <span className={cssStyles.greyText}>
            To trade this token, you must first complete a free (plus gas) transaction.<br/> Confirm it in your
            wallet and keep this tab open!
          </span>
        </Container>
      </Box>
    </Modal>
  );
};
