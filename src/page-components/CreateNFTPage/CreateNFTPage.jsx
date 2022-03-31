import { useState } from "react";
//classnames
import cn from "classnames";
//next
import Image from "next/image";
// mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//components
import { CustSwitch } from "../../components/CustSwitch/CustSwitch";
//utils
import { useStyles, textFields, selects, uploadAndSwitchFields } from "./CreateNFTPage.utils";
//styles
import styles from "./CreateNFTPage.module.css";
import { CustButton } from "../../components/CustButton/CustButton";

export const CreateNFTPage = () => {
  const [values, setValues] = useState({
    name: "",
    externalLink: "",
    description: "",
    collection: "none",
    supply: "none",
    blockchain: "none",
    freezeMetadata: "none"
  });
  const muiClasses = useStyles();
  console.log(muiClasses.select);

  const handleChange = (e, value) => {
    e.preventDefault();
    setValues({ ...values, [value]: e.target.value });
  };

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
            <div className={styles.homeImage}>
              <Image src="/create-nft/home.svg" alt="home-icon" layout="fill" />
            </div>
          </div>
        </div>
        {textFields.map(({ title, description, required, label, multiline, id }) => (
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
              minRows={multiline && 3}
              maxRows={multiline && 10}
            />
          </div>
        ))}
        <div className={styles.section}>
          <div className={styles.title}>
            <span>{selects[0].title}</span>
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
              <span style={{ color: "#FFFFFF4D" }}>{selects[0].placeholder}</span>
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
              <div className={styles.plus}>
                <span>+</span>
              </div>
            ) : (
              <CustSwitch className={styles.switch} defaultChecked={defaultChecked} />
            )}
          </div>
        ))}
        {selects.slice(1).map(({ title, description, options, placeholder, id }) => (
          <div className={cn(styles.section, {
            [styles.sectionWithMarginTop]: title === 'Supply'
          })} key={id}>
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
                <span style={{ color: "#FFFFFF4D" }}>{placeholder}</span>
              </MenuItem>
              {options.map(({ id, text }) => (
                <MenuItem key={id} value={text}>
                  <span>{text}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <CustButton color="primary" text="uyvivb" disabled />
    </div>
  );
};
