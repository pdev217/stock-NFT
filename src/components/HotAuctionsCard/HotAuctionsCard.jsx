import { useState } from "react";
import Image from "next/image";
import styles from "./HotAuctionsCard.module.css";
import { Tag } from "../Tag/Tag";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";

export const HotAuctionsCard = ({
  author,
  code,
  price,
  src,
  tag,
  time,
  title,
  views
}) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);
  console.log(time)

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
        <div className={styles.priceAndTime}>
          <PriceWithIcon price={price} color="yellow" size="m" />
          <span className={styles.time}>{time}</span>
        </div>
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
