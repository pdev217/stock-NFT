import { useEffect, useState, useRef, useLayoutEffect } from "react";
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
//validator
import isEmail from "validator/lib/isEmail";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//styles
import styles from "../../Settings.module.css";

const star = <span className={styles.star}>*</span>;

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
  const [startData, setStartData] = useState({ username: "", email: "" });
  const [disabledButton, setDisabledButton] = useState(true);
  const [errorTextField, setErrorTextField] = useState({
    username: { isError: false, text: "" },
    email: { isError: false, text: "" },
  });
  const [walletAddress, setWalletAddress] = useState();

  const muiClasses = useStyles();
  const walletAddressRef = useRef(null);

  const handleError = (e) => {
    dispatch(
      openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
    );
  };

  const checkUsername = async (value) => {
    if (!value || value === startData.username) {
      setErrorTextField({ ...errorTextField, username: { isError: false, text: "" } });
      return;
    }

    const regexLogin = /^[a-zA-Z0-9_.-]*$/;

    if (!regexLogin.test(value)) {
      setErrorTextField({
        ...errorTextField,
        username: { isError: true, text: "Only latin letters, '-' and '_' are allowed" },
      });
      return;
    } else {
      try {
        const {
          data: { exists },
        } = await axios.get(`${process.env.BACKEND_URL}/users/checkUserName/${value}`);
        exists
          ? setErrorTextField({
              ...errorTextField,
              username: { isError: true, text: "This username is already taken" },
            })
          : setErrorTextField({ ...errorTextField, username: { isError: false, text: "" } });
      } catch (e) {
        handleError(e);
      }
    }
  };

  const checkEmail = async (value) => {
    if (!value || value === startData.email) {
      setErrorTextField({ ...errorTextField, email: { isError: false, text: "" } });
      return;
    }

    if (!isEmail(value)) {
      setErrorTextField({
        ...errorTextField,
        email: { isError: true, text: "E-mail should be an email" },
      });
      return;
    } else {
      setErrorTextField({ ...errorTextField, email: { isError: false, text: "" } });
    }

    try {
      const {
        data: { exists },
      } = await axios.get(`${process.env.BACKEND_URL}/users/checkEmail/${value}`);
      exists
        ? setErrorTextField({
            ...errorTextField,
            email: { isError: true, text: "This e-mail is already taken" },
          })
        : setErrorTextField({ ...errorTextField, email: { isError: false, text: "" } });
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    const account = localStorage.getItem("account");
    setWalletAddress(account);

    getUserData();
  }, []);

  useEffect(() => {
    if (profileData.username && profileData.email) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [profileData.username, profileData.email]);

  const handleChange = (newValue, field) => {
    setProfileData({ ...profileData, [field]: newValue });
    field === "username" && checkUsername(newValue);
    field === "email" && checkEmail(newValue);
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
      setStartData({ username, email });
    } catch (e) {
      handleError(e);
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

      dispatch(openSuccess("Successfully saved"));
    } catch (e) {
      handleError(e);
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
      {textFields.map(({ id, label, multiline, minRows, title, withError, maxLength, required }) => (
        <div key={id} className={styles.textField}>
          <div className={styles.textFieldTitle}>
            <span>
              {title} {required && star}
            </span>
          </div>
          <TextField
            error={withError && errorTextField[id].isError}
            helperText={withError && errorTextField[id].isError && errorTextField[id].text}
            fullWidth
            id={id}
            label={label}
            type={id === "email" ? "email" : "text"}
            variant="outlined"
            className={
              withError && errorTextField[id].isError ? muiClasses.textFieldError : muiClasses.textField
            }
            value={profileData[id]}
            onChange={({ target: { value } }) => handleChange(value, id)}
            InputLabelProps={{
              style: { color: withError && errorTextField[id].isError ? "#d32f2f" : "var(--shadow)" },
            }}
            multiline={multiline}
            minRows={multiline && minRows}
            InputProps={{ style: { color: "white" }, maxLength: maxLength || 524288 }}
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
        disabled={disabledButton}
        onClick={handleSave}
        className={styles.button}
      />
    </div>
  );
};
