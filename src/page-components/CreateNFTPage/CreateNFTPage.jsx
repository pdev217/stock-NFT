import { useState } from "react";
// mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//utils
import { useStyles, textFields, selects } from "./CreateNFTPage.utils";
//styles
import styles from "./CreateNFTPage.module.css";
import Image from "next/image";

export const CreateNFTPage = () => {
  const [age, setAge] = useState("");
  console.log(age);
  const [values, setValues] = useState({
    name: "",
    externalLink: "",
    description: "",
    collection: "none",
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
            <div className={styles.title}>
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
        <FormControl
          sx={{
            width: "100%",
            color: "white",
          }}
        >
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={(e) => handleChange(e, "collection")}
            value={values.collection}
            className={muiClasses.select}
          >
            <MenuItem disabled value="1">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
