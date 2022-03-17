import { useState } from "react";
import Image from "next/image";
import styles from "./HorizontalNFTCard.module.css";
import { Tag } from "../Tag/Tag";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";
import { SmallChart } from "../SmallChart/SmallChart";
import { PriceDifference } from "../PriceDifference/PriceDifference";
import { Ribbon } from "../Ribbon/Ribbon";
import { Author } from "../Author/Author";

export const HorizontalNFTCard = ({
  author,
  availible,
  chartData,
  lastUpdate,
  price,
  priceDifference,
  rewards,
  tag,
  title,
  src,
}) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Ribbon type={rewards} />
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
        <Tag text={tag} className={styles.tag} />
        <PriceWithIcon price={price} color="primary" size="m" />
        <SmallChart data={chartData} className={styles.chart} />
        <div className={styles.priceDiffAndLastUpdate}>
          <PriceDifference
            direction={priceDifference.direction}
            percent={priceDifference.difference}
            className={styles.priceDifferenceInfo}
          />
          <p className={styles.lastUpdate}>{lastUpdate}</p>
        </div>
        <Author
          author={author}
          color="lightblue"
          isConfirmed
          className={styles.author}
        />
      </div>
    </div>
  );
};
