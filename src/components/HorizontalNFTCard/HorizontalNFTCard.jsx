import { useState } from "react";
import Image from "next/image";
import styles from "./HorizontalNFTCard.module.css";
import { Tag } from "../Tag/Tag";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";
import { SmallChart } from "../SmallChart/SmallChart";
import { PriceDifference } from "../PriceDifference/PriceDifference";

export const HorizontalNFTCard = ({
  author,
  availible,
  chartData,
  lastUpdate,
  price,
  priceDifference,
  tag,
  title,
  src,
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
        <SmallChart data={chartData} />
        <div className={styles.priceDiffAndLastUpdate}>
          <PriceDifference
            direction={priceDifference.direction}
            percent={priceDifference.difference}
          />
          <p className={styles.lastUpdate}>
            {lastUpdate}
          </p>
        </div>
        <p className={styles.author}>@{author}</p>
      </div>
    </div>
  );
};
