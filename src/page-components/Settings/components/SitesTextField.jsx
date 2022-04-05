//next
import Image from "next/image";
//mui
import TextField from "@mui/material/TextField";
//hooks
import { useStyles } from "../../../hooks/useStyles";
//styles
import styles from "../Settings.module.css";

export const SitesTextField = ({ handleChange, profileData }) => {
  const muiClasses = useStyles();

  return (
    <>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "7px 0 0 0",
            borderBottom: 'none',
          }}
        >
          <Image src="/profile-settings/Icon-Insta.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="twitterLink"
          label="Your Twitter Handle"
          variant="outlined"
          className={muiClasses.tripleTextFieldTop}
          value={profileData.twitterLink}
          onChange={({ target: { value } }) => handleChange(value, "twitterLink")}
          InputLabelProps={{
            style: { color: "var(--shadow)" },
          }}
          InputProps={{ style: { color: "white" } }}
        />
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "0",
            borderTop: "1px solid var(--shadow)",
            borderBottom: 'none',
            height: "56px"
          }}
        >
          <Image src="/profile-settings/Icon-Insta.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="instagramLink"
          label="Your Instagram Handle"
          variant="outlined"
          className={muiClasses.tripleTextFieldCenter}
          value={profileData.instagramLink}
          onChange={({ target: { value } }) => handleChange(value, "instagramLink")}
          InputLabelProps={{
            style: { color: "var(--shadow)" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "0 0 0 7px",
            borderTop: "1px solid var(--shadow)",
            height: "56px"
          }}
        >
          <Image src="/profile-settings/Icon-Insta.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="websiteLink"
          label="yoursite.io"
          variant="outlined"
          className={muiClasses.tripleTextFieldBottom}
          value={profileData.websiteLink}
          onChange={({ target: { value } }) => handleChange(value, "websiteLink")}
          InputLabelProps={{
            style: { color: "var(--shadow)" },
          }}
          InputProps={{ style: { color: "white" } }}
        />
      </div>
    </>
  );
};
