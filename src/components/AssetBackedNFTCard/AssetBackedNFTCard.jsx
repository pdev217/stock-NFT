import { useState } from "react";
import Image from "next/image";
import styles from "./AssetBackedNFTCard.module.css";
import { Tag } from "../Tag/Tag";

export const AssetBackedNFTCard = ({ src, title, text, tags }) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
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
      </div>{" "}
      <div className={styles.infoWrapper}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
        <div className={styles.tagsContainer}>
          {tags.map((tag, i) => (
            <Tag key={`asset-backed-tag-${i}`} text={tag.text} />
          ))}
        </div>
      </div>
    </div>
  );
};
