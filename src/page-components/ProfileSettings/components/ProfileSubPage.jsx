import { useState } from "react";
//components
import { ImageUploadField } from "./ImageUploadField";
//utils
import { imageDataArray } from "./ProfileSubPage.utils";
//styles
import styles from "../ProfileSettings.module.css";

export const ProfileSubPage = () => {
  const [profileData, setProfileData] = useState([]);
  return (
    <>
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
    </>
  );
};
