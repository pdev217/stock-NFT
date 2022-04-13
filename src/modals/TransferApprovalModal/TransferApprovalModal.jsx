import { useState } from "react";
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
          <span>Add Properties</span>
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
          Properties show up underneath your item, are clickable, and can be filtered in your
          collection&apos;s sidebar.
        </Typography>
        <footer className={cssStyles.footer}>
          <CustButton color="primary" onClick={handleSave} text="Save" />
        </footer>
      </Box>
    </Modal>
  );
};
