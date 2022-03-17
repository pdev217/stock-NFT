import { useState } from "react";
import Image from "next/image";
import styles from "./BigMainpageCollectionInfo.module.css";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";
import { CustButton } from "../CustButton/CustButton";

export const BigMainpageCollectionInfo = ({
  title,
  upperCaseText,
  discount,
  src,
}) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);

  return (
    <div className={styles.wrapper}>
      {isImageAbsent ? (
        <div className={styles.errorImage}></div>
      ) : (
        <Image
          alt={title}
          className={styles.image}
          layout="fill"
          onError={(e) => e && setIsImageAbsent(true)}
          src={src}
        />
      )}
      <div className={styles.infoWrapper}>
        <p className={styles.title}>{title}</p>
        <p className={styles.upperCaseText}>{upperCaseText}</p>
        <p className={styles.discounted}>
          Get <PriceWithIcon price={discount} color="primary" size="m" /> for
          purchasing!
        </p>
        <CustButton text="Collect Now" color="primary" />
      </div>
    </div>
  );
};
