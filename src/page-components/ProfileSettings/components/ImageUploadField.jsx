//next
import Image from "next/image";
//classnames
import cn from "classnames";
//components
import { CustButton } from "../../../components/CustButton/CustButton";
//styles
import styles from "../ProfileSettings.module.css";

export const ImageUploadField = ({ src, profileData, setProfileData, text, form }) => {
  return (
    <div className={styles.imageFieldWrapper}>
      <div className={styles.imageTitle}>
        <span>{text}</span>
      </div>
      <div className={styles.imageButtonsWrapper}>
        <div
          className={cn(styles.profileImage, {
            [styles.imageRounded]: form === "round",
            [styles.imageSquare]: form === "square",
          })}
        >
          <Image src={src} alt="avatar" layout="fill" />
        </div>
        <div className={styles.profileImageButtons}>
          <CustButton text="Upload Image" color="primary" className={styles.imageButton} fullWidth/>
          <CustButton text="Change Image" color="red" className={styles.imageButton} />
        </div>
      </div>
    </div>
  );
};
