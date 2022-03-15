import { useState } from "react";
import Image from "next/image";
import styles from "./HorizontalNFTCard.module.css";
import { Tag } from "../Tag/Tag";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";

export const HorizontalNFTCard = ({
  author,
  availible,
  chart,
  lastUpdate,
  price,
  priceDifference,
  tag,
  title
}) => {
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
      </div>
      <div className={styles.infoWrapper}>
        <p className={styles.title}>{title}</p>
        <p className={styles.availible}>{availible} Availible</p>
        <Tag text={tag} />
        <PriceWithIcon price={price} color="yellow" size="sm" />
        <div className={styles.chart}>{chart}</div>
        <div className={styles.authorAndViews}>
          <p className={styles.author}>@{author}</p>
          <p className={styles.views}>IC {views} Today</p>
        </div>
        <div className={styles.codeAndTag}>
          <p className={styles.code}>{code}</p>
          <Tag text={tag} />
        </div>
      </div>
    </div>
  );
};
