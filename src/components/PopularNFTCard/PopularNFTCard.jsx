import { useState } from "react";
import Image from "next/image";
import styles from "./PopularNFTCard.module.css";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";
import { PriceDifference } from "../PriceDifference/PriceDifference";
import { Tag } from "../Tag/Tag";
import { Ribbon } from "../Ribbon/Ribbon";

export const PopularNFTCard = ({
  author,
  code,
  price,
  priceDifference,
  src,
  tag,
  title,
  rewards,
}) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Ribbon type={rewards} />
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
        <div className={styles.priceInfo}>
          <PriceWithIcon price={price} color="red" size="sm" />
          <PriceDifference
            direction={priceDifference.direction}
            percent={priceDifference.percent}
          />
        </div>
        <p className={styles.author}>@{author} IC</p>
        <div className={styles.codeAndTag}>
          <p className={styles.code}>{code}</p>
          <Tag text={tag} />
        </div>
      </div>
    </div>
  );
};
