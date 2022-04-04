import { useState, useEffect } from "react";
//classnames
import cn from "classnames";
//next
import Image from "next/image";
//redux
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//components
import { CustSwitch } from "../../components/CustSwitch/CustSwitch";
import { CustButton } from "../../components/CustButton/CustButton";
import { AddStatsOrLevelsModal } from "../../modals/AddToNFTModal/AddStatsOrLevelsModal";
import { Stat } from "../../components/Stat/Stat";
import { Level } from "../../components/Level/Level";
import { Property } from "../../components/Property/Property";
import { AddPropertiesModal } from "../../modals/AddToNFTModal/AddPropertiesModal";
//utils
import { useStyles, textFields, selects, uploadAndSwitchFields } from "./CreateNFTPage.utils";
//styles
import styles from "./CreateNFTPage.module.css";
//web3
import { useWeb3React } from "@web3-react/core";
//ethers
import { ethers } from "ethers";
//hooks
import useAuth from "../../hooks/useAuth";

export const CreateNFTPage = () => {
  const { active } = useWeb3React;
  const dispatch = useDispatch();
  const { account, error } = useAuth();

  if (error) {
    dispatch(openError(`${error.message}`));
  }

  const [values, setValues] = useState({
    file: undefined,
    name: "",
    externalLink: "",
    description: "",
    collection: "none",
    properties: [],
    levels: [],
    stats: [],
    unlockable: "",
    isSensitiveContent: false,
    supply: "none",
    blockchain: "none",
    freezeMetadata: "none",
  });

  const [previewFile, setPrewiewFile] = useState();
  const [disabledButton, setDisabledButton] = useState(true);
  const [enabledUnlockable, setEnsabledUnlockable] = useState(true);
  const [isAddStatsOpened, setIsAddStatsOpened] = useState(false);
  const [isAddLevelsOpened, setIsAddLevelsOpened] = useState(false);
  const [isAddPropertiesOpened, setIsAddPropertiesOpened] = useState(false);

  const muiClasses = useStyles();

  const handleChange = (e, value, type) => {
    e.preventDefault();
    console.log(type);

    switch (type) {
      case "string":
        setValues({ ...values, [value]: e.target.value });
        break;
      case "file":
        const file = e.target.files[0];
        const link = e.target.value;
        if (file.size < 100000000) {
          setValues({ ...values, file: file });
        } else {
          dispatch(openError(`The uploaded file must be smaller than 100 mb`));
        }
        break;
      case "boolean":
        if (value === 'unlockable') {
          setEnsabledUnlockable(e.target.checked);
        } else if (value === 'isSensitiveContent') {
          setValues({ ...values, [value]: e.target.checked });
        }
        break;
    }
  };

  const handleOpenPopup = (type) => {
    switch (type) {
      case "stats":
        setIsAddStatsOpened(true);
        break;
      case "levels":
        setIsAddLevelsOpened(true);
        break;
      case "properties":
        setIsAddPropertiesOpened(true);
        break;
    }
  };

  const handleSave = () => {};

  useEffect(() => {
    if (
      values.fileLink &&
      values.name &&
      values.description &&
      values.collection !== "none" &&
      values.collection !== "None"
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [values.fileLink, values.name, values.description, values.collection]);

  useEffect(() => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
    }
  }, [account]);

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
              onChange={(e) => handleChange(e, "file", "file")}
              accept=".png, .jpg, .gif, .svg, .mp4, .webm, .mp3, .wav, .ogg, .glb, .gltf"
            />
            {values.file && <Image src={values.file} alt="image" />}
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
              onChange={(e) => handleChange(e, id, "string")}
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
            onChange={(e) => handleChange(e, "collection", "string")}
            value={values.collection}
            className={muiClasses.select}
          >
            <MenuItem disabled value="none">
              <span style={{ color: "var(--light-grey)" }}>{selects[0].placeholder}</span>
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
                <div className={styles.plus} onClick={() => handleOpenPopup(id)}>
                  <span>+</span>
                </div>
              ) : (
                <CustSwitch
                  className={styles.switch}
                  defaultChecked={defaultChecked}
                  onChange={(e) => handleChange(e, id, 'boolean')}
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
                  label="Provide a detail description of your item"
                  variant="outlined"
                  className={muiClasses.textField}
                  value={values.unlockable}
                  onChange={(e) => handleChange(e, "unlockable", "string")}
                  InputLabelProps={{
                    style: { color: "#FFFFFF4D" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  multiline
                  minRows={3}
                  maxRows={10}
                />
              </div>
            )}
            {id === "stats" &&
              values.stats.map(({ name, nftValue, maxValue, id }) => (
                <Stat key={id} name={name} nftValue={nftValue} maxValue={maxValue} />
              ))}
            {id === "levels" &&
              values.levels.map(({ name, nftValue, maxValue, id }) => (
                <Level key={id} name={name} nftValue={nftValue} maxValue={maxValue} />
              ))}
            {id === "properties" && (
              <div className={styles.propertiesWrapper}>
                {values.properties.map(({ name, type, id }) => (
                  <Property key={id} name={name} type={type} />
                ))}
              </div>
            )}
          </div>
        ))}
        {selects.slice(1).map(({ title, description, options, placeholder, required, id }) => (
          <div
            className={cn(styles.section, {
              [styles.sectionWithMarginTop]: title === "Supply",
              [styles.sectionWithBigMarginBottom]: title === "Freeze Metadata",
            })}
            key={id}
          >
            <div className={styles.title}>
              <span>{title} {required && star}</span>
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
              onChange={(e) => handleChange(e, id, "string")}
              value={values[id]}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span style={{ color: "var(--dark-grey)" }}>{placeholder}</span>
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
        <AddStatsOrLevelsModal
          title="Add Stats"
          description="Stats show up underneath your item, are clickable, and can be filtered in your collection’s sidebar."
          isModalOpened={isAddStatsOpened}
          setIsModalOpened={setIsAddStatsOpened}
          data={values}
          setData={setValues}
        />
        <AddStatsOrLevelsModal
          title="Add Levels"
          description="Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
          isModalOpened={isAddLevelsOpened}
          setIsModalOpened={setIsAddLevelsOpened}
          data={values}
          setData={setValues}
        />
        <AddPropertiesModal
          isModalOpened={isAddPropertiesOpened}
          setIsModalOpened={setIsAddPropertiesOpened}
          data={values}
          setData={setValues}
        />
      </div>
    </div>
  );
};
