import { useEffect, useState, useRef } from "react";
//next
import Image from "next/image";
//mui
import TextField from "@mui/material/TextField";
//components
import { ImageUploadField } from "../ImageUploadField";
import { SitesTextField } from "../SitesTextField";
import { CustButton } from "../../../../components/CustButton/CustButton";
//utils
import { imageDataArray, textFields } from "./ProfileSubPage.utils";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//styles
import styles from "../../Settings.module.css";

export const ProfileSubPage = () => {
  const [profileData, setProfileData] = useState({
    avatar: undefined,
    banner: undefined,
    username: "",
    bio: "",
    email: "",
    twitterLink: "",
    instagramLink: "",
    websiteLink: "",
    walletAddress: "",
  });
  const [isCopyTooltipOpened, setIsCopyTooltipOpened] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const muiClasses = useStyles();
  const walletAddressRef = useRef(null);

  useEffect(() => {
    const account = localStorage.getItem("account");
    setProfileData({ ...profileData, walletAddress: account });
  }, []);

  const handleChange = (newValue, field) => {
    if (typeof profileData[field] === "string") {
      setProfileData({ ...profileData, [field]: newValue });
    }
  };

  const handleSave = () => {};

  const copyToClipboard = () => {
    walletAddressRef.current.select();
    document.execCommand("copy");
    setIsCopyTooltipOpened(true);

    setTimeout(() => {
      setIsCopyTooltipOpened(false);
    }, 2000);
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.title}>
        <span>Profile Settings</span>
      </div>
      {imageDataArray.map(({ src, text, form, id }) => (
        <ImageUploadField
          src={src}
          key={id}
          profileData={profileData}
          setProfileData={setProfileData}
          text={text}
          form={form}
        />
      ))}
      {textFields.map(({ id, label, multiline, minRows, title }) => (
        <div key={id} className={styles.textField}>
          <div className={styles.textFieldTitle}>
            <span>{title}</span>
          </div>
          <TextField
            fullWidth
            id={id}
            label={label}
            variant="outlined"
            className={muiClasses.textField}
            value={profileData[id]}
            onChange={({ target: { value } }) => handleChange(value, id)}
            InputLabelProps={{
              style: { color: "var(--shadow)" },
            }}
            multiline={multiline}
            minRows={multiline && minRows}
            InputProps={{ style: { color: "white" } }}
          />
        </div>
      ))}
      <div className={styles.textField}>
        <div className={styles.textFieldTitle}>
          <span>Links</span>
        </div>
        <SitesTextField handleChange={handleChange} profileData={profileData} />
      </div>
      <div className={styles.textField}>
        <div className={styles.textFieldTitle}>
          <span>Wallet Address</span>
        </div>
        <TextField
          fullWidth
          inputRef={walletAddressRef}
          id="walletAddress"
          variant="outlined"
          className={muiClasses.textField}
          value={profileData.walletAddress}
          InputLabelProps={{
            style: { color: "var(--shadow)" },
          }}
          InputProps={{
            style: { color: "white" },
            endAdornment: (
              <Image
                src="/profile-settings/Icon-Copy.svg"
                alt="copy"
                width={19}
                height={19}
                onClick={copyToClipboard}
              />
            ),
            readOnly: true,
          }}
        />
        {isCopyTooltipOpened && (
          <div className={styles.tooltip}>
            <span>Copied!</span>
          </div>
        )}
      </div>
      <CustButton
        color="primary"
        text="Save"
        disabled={disabledButton}
        onClick={handleSave}
        className={styles.button}
      />
    </div>
  );
};
