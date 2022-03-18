import { useState } from "react";
import Image from "next/image";
import { CustButton } from "../CustButton/CustButton";
import styles from "./BigCategoryCard.module.css";

export const BigCategoryCard = ({ src, categoryName, title }) => {
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
        <div className={styles.info}>
          <p className={styles.categoryName}>{categoryName}</p>
          <p className={styles.title}>{title}</p>
        </div>
        <CustButton color="red" text="Shop Now" />
      </div>
    </div>
  );
};
