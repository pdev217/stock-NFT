import { useState } from "react";
import styles from "./Category.module.css";
import Image from "next/image";
import cn from "classnames"

export const Category = ({ src, title }) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);

  return (
    <div className={styles.wrapper}>
      {isImageAbsent ? (
        <div className={cn(styles.errorImage, styles.image)}></div>
      ) : (
        <Image
          src={src}
          alt={title}
          layout="fill"
          onError={() => setIsImageAbsent(true)}
        />
      )}
      <p className={styles.text}>{title}</p>
    </div>
  );
};
