import { useState, useEffect } from "react";
//classnames
import cn from "classnames";
//next
import { useRouter } from "next/router";
import Image from "next/image";
//axios
import axios from "axios";
//redux
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
=======
import { useDispatch } from "react-redux";
import { logout, setAccount, login } from "../../redux/slices/authorizationSlice";
>>>>>>> f22cc93cd5f8f3d8bc6d380a47d6b485ca7e45d4
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//components
import { CustSwitch } from "../../components/CustSwitch/CustSwitch";
import { CustButton } from "../../components/CustButton/CustButton";
//utils
import { useStyles, textFields, selects, uploadAndSwitchFields } from "./CreateNFTPage.utils";
//styles
import styles from "./CreateNFTPage.module.css";
import { useWeb3React } from "@web3-react/core";
//ethers
import { ethers } from "ethers";
//hook
import useAuth from "../../hooks/useAuth";

export const CreateNFTPage = () => {
  const { active } = useWeb3React
  const { account } = useAuth();
  console.log(account)

  const [values, setValues] = useState({
    file: undefined,
    name: "",
    externalLink: "",
    description: "",
    collection: "none",
    properties: undefined,
    levels: undefined,
    stats: undefined,
    unlockable: true,
    explicit: false,
    supply: "none",
    blockchain: "none",
    freezeMetadata: "none",
  });
  const [disabledButton, setDisabledButton] = useState(true);
  const [enabledUnlockable, setEnsabledUnlockable] = useState(true);
  const muiClasses = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

<<<<<<< HEAD
=======
  const verifyUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios
        .get(`${process.env.BACKEND_URL}/auth/verifyUser`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((result) => {
          localStorage.setItem("accessToken", result.data.token);
          dispatch(login());
        });
    } catch (e) {
      dispatch(logout());
      dispatch(setAccount(null));
      router.push("/connect-wallet");
      if (e.response) {
        dispatch(openError(`${e.response.data.statusCode} ${e.response.data.message}`));
      } else {
        dispatch(openError(e.message));
      }
    }
  };

  useEffect(() => {
    if (
      values.file &&
      values.name &&
      values.description &&
      values.collection !== "None" &&
      values.collection !== "none"
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [values.file, values.name, values.collection, values.description]);

  useEffect(() => {
    verifyUser();
  }, []);

>>>>>>> f22cc93cd5f8f3d8bc6d380a47d6b485ca7e45d4
  const handleChange = (e, value, isFile) => {
    e.preventDefault();

    if (isFile) {
      const file = e.target.files[0];
      if (file.size < 100000) {
        setValues({ ...values, [value]: file });
      } else {
        dispatch(openError(`The uploaded file must be smaller than 100 mb`));
      }
    } else {
      setValues({ ...values, [value]: e.target.value });
    }
  };

  const handleSave = () => {};

  useEffect(() => {
    if(account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner(account);
      console.log(signer)
    }
  }, [account])

  const star = <span className={styles.star}>*</span>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainTitle}>
          <span>Create New Item</span>
        </div>
        <div className={styles.uploadItemSection}>
          <div className={styles.title}>
            <span>Image, Video, Audio, or 3D Model {star}</span>
          </div>
          <div className={styles.description}>
            <span>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </span>
          </div>
          <div className={styles.dragPlaceholder}>
            <input
              className={styles.uploadFileInput}
              type="file"
              onChange={(e) => handleChange(e, "file", true)}
              accept=".png, .jpg, .gif, .svg, .mp4, .webm, .mp3, .wav, .ogg, .glb, .gltf"
            />
          </div>
        </div>
        {textFields.map(({ title, description, required, label, multiline, id, maxLength }) => (
          <div key={id} className={styles.section}>
            <div
              className={cn(styles.title, {
                [styles.name]: title === "Name",
              })}
            >
              <span>
                {title} {required && star}
              </span>
            </div>
            {description && (
              <div className={styles.description}>
                <span>{description}</span>
              </div>
            )}
            <TextField
              fullWidth
              id={label}
              label={label}
              variant="outlined"
              className={muiClasses.textField}
              value={values[id]}
              onChange={(e) => handleChange(e, id)}
              InputLabelProps={{
                style: { color: "#FFFFFF4D" },
              }}
              InputProps={{ style: { color: "white" } }}
              multiline={multiline}
              inputProps={{
                maxLength: maxLength || 524288,
              }}
              minRows={multiline && 3}
              maxRows={multiline && 10}
            />
          </div>
        ))}
        <div className={styles.section}>
          <div className={styles.title}>
            <span>
              {selects[0].title} {star}
            </span>
          </div>
          <div className={styles.description}>
            <span>{selects[0].description}</span>
          </div>
          <Select
            fullWidth
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            style={{
              color: "white",
            }}
            onChange={(e) => handleChange(e, "collection")}
            value={values.collection}
            className={muiClasses.select}
          >
            <MenuItem disabled value="none">
              <span>{selects[0].placeholder}</span>
            </MenuItem>
            {selects[0].options.map(({ id, text }) => (
              <MenuItem key={id} value={text}>
                <span>{text}</span>
              </MenuItem>
            ))}
          </Select>
        </div>
        {uploadAndSwitchFields.map(({ title, description, icon, type, id, defaultChecked }) => (
          <div key={id} className={styles.underlinedSection}>
            <div>
              <div className={styles.fieldIcon}>
                <Image src={icon} layout="fill" alt={title} />
              </div>
              <div className={styles.fieldsTitleDescriptionWrapper}>
                <div className={styles.boldTitle}>
                  <span>{title}</span>
                </div>
                <div className={styles.description}>
                  <span>{description}</span>
                </div>
              </div>
              {type === "add" ? (
                <div className={styles.plus} onClick={() => {}}>
                  <span>+</span>
                </div>
              ) : (
                <CustSwitch
                  className={styles.switch}
                  defaultChecked={defaultChecked}
                  onChange={(e) => setEnsabledUnlockable(e.target.checked)}
                />
              )}
            </div>
            {title === "Unlockable Content" && (
              <div
                className={cn(styles.unlockable, {
                  [styles.unlockableDisplayed]: enabledUnlockable,
                  [styles.unlockableAbsent]: !enabledUnlockable,
                })}
              >
                <div
                  className={cn(styles.title, {
                    [styles.name]: title === "Name",
                  })}
                ></div>
                <TextField
                  fullWidth
                  id="Unlockable"
                  label="Unlockable Content"
                  variant="outlined"
                  className={muiClasses.textField}
                  value={values.unlockable}
                  onChange={(e) => handleChange(e, "unlockable")}
                  InputLabelProps={{
                    style: { color: "#FFFFFF4D" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  multiline
                />
              </div>
            )}
          </div>
        ))}
        {selects.slice(1).map(({ title, description, options, placeholder, id }) => (
          <div
            className={cn(styles.section, {
              [styles.sectionWithMarginTop]: title === "Supply",
              [styles.sectionWithBigMarginBottom]: title === "Freeze Metadata",
            })}
            key={id}
          >
            <div className={styles.title}>
              <span>{title}</span>
            </div>
            <div className={styles.description}>
              <span>{description}</span>
            </div>
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              style={{
                color: "white",
              }}
              onChange={(e) => handleChange(e, id)}
              value={values[id]}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span>{placeholder}</span>
              </MenuItem>
              {options.map(({ id, text }) => (
                <MenuItem key={id} value={text}>
                  <span>{text}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
        ))}
        <CustButton
          color="primary"
          text="Save"
          disabled={disabledButton}
          onClick={handleSave}
          className={styles.button}
        />
      </div>
    </div>
  );
};
