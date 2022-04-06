import { useEffect, useState, useRef } from "react";
//redux
import { open as openError } from "../../../../redux/slices/errorSnackbarSlice";
import { open as openSuccess } from "../../../../redux/slices/successSnackbarSlice";
import { useDispatch } from "react-redux";
//next
import Image from "next/image";
//axios
import axios from "axios";
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
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    email: "",
    twitterLink: "",
    instagramLink: "",
    websiteLink: "",
  });
  const [profileImages, setProfileImages] = useState({
    profileImage: "",
    profileBanner: "",
  });
  const [isCopyTooltipOpened, setIsCopyTooltipOpened] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [walletAddress, setWalletAddress] = useState();

  const muiClasses = useStyles();
  const walletAddressRef = useRef(null);

  useEffect(() => {
    const account = localStorage.getItem("account");
    setWalletAddress(account);

    getUserData();
  }, []);

  const handleChange = (newValue, field) => {
    if (typeof profileData[field] === "string") {
      setProfileData({ ...profileData, [field]: newValue });
    }
  };

  const getUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const publicAddress = localStorage.getItem("account");

      const {
        data: { username, bio, email, twitterLink, instagramLink, websiteLink, profileImage, profileBanner },
      } = await axios.get(`${process.env.BACKEND_URL}/users/${publicAddress}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });

      setProfileData({ username, bio, email, twitterLink, instagramLink, websiteLink });
      setProfileImages({ profileBanner, profileImage });
    } catch (e) {
      dispatch(
        openError(e.response.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const publicAddress = localStorage.getItem("account");

      await axios.patch(
        `${process.env.BACKEND_URL}/users/${publicAddress}`,
        { ...profileData },
        { headers: { Authorization: "Bearer " + accessToken } }
      );

      dispatch(openSuccess('Successfully saved'))
    } catch (e) {
      dispatch(
        openError(e.response.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

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
          type={id}
          profileImages={profileImages}
          setProfileImages={setProfileImages}
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
          value={walletAddress}
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
        disabled={false}
        onClick={handleSave}
        className={styles.button}
      />
    </div>
  );
};
