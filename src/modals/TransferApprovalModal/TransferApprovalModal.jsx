//redux
import { useDispatch } from "react-redux";
//next
import Image from "next/image";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//components
import { CustButton } from "../../components/CustButton/CustButton";
//styles
import { styles as jsStyles } from "../AddToNFTModal/AddToNFTModal.utils";
import cssStyles from "../AddToNFTModal/AddToNFTModal.module.css";

export const TransferApprovalModal = ({ isOpened, handleClose, setIsMakeOfferModalOpened }) => {
  const dispatch = useDispatch();

  const handleBack = () => {
    setIsMakeOfferModalOpened(true);
  };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
          <span>Transfer approval</span>
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
        <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.description}>
          To trade this token, you must first complete a free (plus gas) transaction. Confirm it in your
          wallet and keep this tab open! 
          <br />
          <br />
          You might notice a very large number being requested for approval - this is simply the maximum
          amount, meaning you’ll never have to do this approval again. 
          <br />
          <br />
          It also doesn’t allow us to transfer that amount for you - the amount you sign in the next step is
          all that can be traded on your behalf.
        </Typography>
        <footer className={cssStyles.footer}>
          <CustButton color="primary" onClick={() => {}} text="Got it" />
        </footer>
      </Box>
    </Modal>
  );
};
