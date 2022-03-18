import { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { AmountWithIcon } from "../AmountWithIcon/AmountWithIcon";
import { Tag } from "../Tag/Tag";
import { SmallChart } from "../SmallChart/SmallChart";
import { CustButton } from "../CustButton/CustButton";
import { Views } from "../Views/Views";
import styles from "./SpecialAuctionNFTCard.module.css";

export const SpecialAuctionNFTCard = ({
  className,
  NFTName,
  time,
  username,
  code,
  currPrice,
  prevPrices,
  chartData,
  views,
  src,
  tag,
}) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.leftSide}>
        <div className={styles.imageWrapper}>
          {isImageAbsent ? (
            <div className={styles.errorImage}></div>
          ) : (
            <Image
              alt={NFTName}
              className={styles.image}
              layout="fill"
              onError={(e) => e && setIsImageAbsent(true)}
              src={src}
            />
          )}
        </div>
        <div className={styles.leftSideInfo}>
          <p className={styles.NFTName}>{NFTName}</p>
          <p className={styles.time}>{time}</p>
          <div className={styles.usernameCodeTag}>
            <div className={styles.usernameCode}>
              <p className={styles.username}>{username}</p>
              <p className={styles.code}>{code}</p>
            </div>
            <Tag text={tag} className={styles.tag} />
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <p className={styles.currentPriceTitle}>CURRENT PRICE</p>
        <AmountWithIcon
          amount={currPrice}
          color="primary"
          size="l"
          className={styles.amountWithIconBig}
        />
        <Views quantity={views} className={styles.views} />
        <p className={styles.historyTitle}>HISTORY</p>
        <SmallChart data={chartData} className={styles.chart} />
        <div className={styles.prevPrices}>
          {prevPrices.length > 0 &&
            prevPrices.map((price) => (
              <div key={price.id} className={styles.prevPrice}>
                <AmountWithIcon
                  amount={price.price}
                  color="primary"
                  size="sm"
                  className={styles.amountWithIconSmall}
                />
                <p className={styles.updatePrevPrice}>{price.updated}</p>
              </div>
            ))}
        </div>
        <CustButton text="Bid" color="primary" className={styles.button} />
      </div>
    </div>
  );
};
