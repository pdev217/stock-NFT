import { useState, useEffect } from "react";
//next
import Image from "next/image";
//conponents
import { NotificationRow } from "../NotificationRow";
import { CustButton } from "../../../../components/CustButton/CustButton";
//mui
import TextField from "@mui/material/TextField";
//utils
import { rowsData } from "./NoticicationsSubPage.utils";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//styles
import styles from "../../Settings.module.css";

export const NoticicationsSubPage = () => {
  const [disabledButton, setDidabledButton] = useState(true);
  const [account, setAccount] = useState("");
  const [notificationsData, setNotificationsData] = useState({
    
    maxTheresold: "",
  });
  
  const muiClasses = useStyles();
  
  useEffect(() => {
    setAccount(localStorage.getItem("account"));
  }, []);

  const handleChange = (newValue, field) => {

  }

  return (
    <div className={styles.noticicationsWrapper}>
      <div className={styles.notificationSubPageTitle}>
        <span>Notification Settings</span>
      </div>
      <div className={styles.titleDescription}>
        <span>
          Select which notifications you would like to receive for{" "}
          {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
        </span>
      </div>
      {rowsData.map(({ title, description, id, defaultChecked }) => (
        <NotificationRow key={id} description={description} title={title} defaultChecked={defaultChecked} />
      ))}
      <div className={styles.minimumBit}>
        <div className={styles.fieldsTitleDescriptionWrapper}>
          <div className={styles.notificationTitle}>
            <span>Minimum Bid Threshold</span>
          </div>
          <div className={styles.notificationDescription}>
            <span>
              Receive notifications only when you receive offers with a value greater than or equal to this
              amount of ETH.
            </span>
          </div>
        </div>
        <div className={styles.websiteImageWrapper}>
          <div
            className={styles.ethImageContainer}
            style={{
              borderRadius: "7px 0 0 7px",
            }}
          >
            <Image src="/profile-settings/Icon-Insta.svg" alt="insta" width={19} height={19} />
            <div className={styles.etheriumText}>
              <span>ETH</span>
              <span>Ethereum</span>
            </div>
          </div>
          <TextField
            fullWidth
            id="maxTheresold"
            variant="outlined"
            type="number"
            className={muiClasses.textFieldWithoutLeft}
            value={notificationsData.maxTheresold}
            onChange={({ target: { value } }) => {}}
            InputLabelProps={{
              style: { color: "var(--shadow)" },
            }}
            InputProps={{ style: { color: "white" } }}
          />
        </div>
        <CustButton className={styles.button} text="Save" color="primary" disabled={disabledButton} />
      </div>
    </div>
  );
};
