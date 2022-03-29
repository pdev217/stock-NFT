import { useSelector, useDispatch } from "react-redux";
import { close } from "../../redux/slices/logoutModalSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CustButton } from "../CustButton/CustButton";

export const LogoutWindow = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#282829",
    border: "2px solid #898D96",
    borderRadius: '24px',
    boxShadow: 24,
    marginBottom: '20px',
    textAlign: 'center',
    color: 'white',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const { isOpened } = useSelector((state) => state.logoutModal);
  console.log('isOpened', isOpened)
  const dispatch = useDispatch();
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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you really want to log out?
        </Typography>
        <div style={{display: 'flex', justifyContent: 'space-around',  
    marginTop: '20px',}}>
          <CustButton color="primary" text="yes" />
          <CustButton color="primary" text="no" />
        </div>
      </Box>
    </Modal>
  );
};
