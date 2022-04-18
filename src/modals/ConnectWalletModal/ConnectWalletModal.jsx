//next
import Image from "next/image";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//components
import { ChooseWalletBox } from "../../components/ChooseWalletBox/ChooseWalletBox";
//styles
import { styles as jsStyles } from "./ConnectWalletModal.utils";
import cssStyles from "./ConnectWalletModal.module.css";

export const ConnectWalletModal = ({ isOpened, handleClose }) => {
  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
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
      </Box>
    </Modal>
  );
};
