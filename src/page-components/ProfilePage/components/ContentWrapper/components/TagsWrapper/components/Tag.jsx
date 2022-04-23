//next
import Image from "next/image";
//styles
import styles from "./Tag.module.scss";

export const Tag = ({ icon, text, handleClose }) => {
  return (
    <div className={styles.wrapper}>
      {icon && (
        <div className={styles.imageWrapper}>
          <Image
            src={icon}
            loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
            alt="icon"
            width={27}
            height={27}
          />
        </div>
      )}
      <div className={styles.text}>
        <span>{text}</span>
      </div>
      <div className={styles.cross} onClick={handleClose}>
        <Image src="/create-nft/Icon-Close.svg" alt="colse-icon" width={15} height={15} />
      </div>
    </div>
  );
};
