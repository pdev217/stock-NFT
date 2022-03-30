import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { close } from "../../redux/slices/logoutModalSlice";
import { logout, setAccount } from "../../redux/slices/authorizationSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CustButton } from "../CustButton/CustButton";
import { style } from './LogoutWindow.utils'

export const LogoutWindow = () => {
  const { isOpened } = useSelector((state) => state.logoutModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const { deactivate } = useWeb3React();

  const handleClose = () => {
    dispatch(close());
  };

  const handleLogout = () => {
    deactivate();
    dispatch(logout());
    dispatch(setAccount(null));
    router.push("/connect-wallet");
    dispatch(close());
  };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you really want to log out?
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <CustButton color="primary" onClick={handleLogout} text="yes" />
          <CustButton color="primary" onClick={handleClose} text="no" />
        </div>
      </Box>
    </Modal>
  );
};
