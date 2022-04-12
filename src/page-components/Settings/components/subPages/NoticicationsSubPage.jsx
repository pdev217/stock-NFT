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

const fakeServerData = {
  itemsSold: false,
  bidActivity: true,
  priceChange: true,
  auctionExpiration: false,
  outbid: true,
  ownedItemUpdates: true,
  successfulPurchase: true,
  openSeaNewsletter: false,
  maxTheresold: 0.005,
};

export const NoticicationsSubPage = () => {
  const [disabledButton, setDidabledButton] = useState(true);
  const [account, setAccount] = useState("");
  const [startData, setStartData] = useState({});
  const [notificationsData, setNotificationsData] = useState({
    itemsSold: false,
    bidActivity: true,
    priceChange: true,
    auctionExpiration: false,
    outbid: true,
    ownedItemUpdates: true,
    successfulPurchase: true,
    openSeaNewsletter: false,
    maxTheresold: 0.005,
  });

  const muiClasses = useStyles();

  useEffect(() => {
    setAccount(localStorage.getItem("account"));
    setNotificationsData({ ...fakeServerData });
    setStartData({ ...fakeServerData });
  }, []);

  useEffect(() => {
    const newData = JSON.stringify(notificationsData);
    if (newData !== JSON.stringify(startData)) {
      setDidabledButton(false);
    } else {
      setDidabledButton(true);
    }
  }, [{ ...notificationsData }]);

  const handleChange = (newValue, field) => {
    setNotificationsData({ ...notificationsData, [field]: newValue });
  };

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
      {rowsData.map(({ title, description, id }) => (
        <NotificationRow
          key={id}
          id={id}
          description={description}
          title={title}
          checked={notificationsData[id]}
          notificationsData={notificationsData}
          setNotificationsData={setNotificationsData}
        />
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
            <Image src="/profile-settings/Icon-Eth.svg" alt="insta" width={31} height={31} />
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
            onChange={({ target: { value } }) => handleChange(value, "maxTheresold")}
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
