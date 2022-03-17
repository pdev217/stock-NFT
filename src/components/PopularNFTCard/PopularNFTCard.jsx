import { useState } from "react";
import Image from "next/image";
import styles from "./PopularNFTCard.module.css";
import { PriceWithIcon } from "../PriceWithIcon/PriceWithIcon";
import { PriceDifference } from "../PriceDifference/PriceDifference";
import { Tag } from "../Tag/Tag";
import { Ribbon } from "../Ribbon/Ribbon";
import { Username } from "../Username/Username";

export const PopularNFTCard = ({
  username,
  code,
  price,
  priceDifference,
  src,
  tag,
  title,
  rewards,
}) => {
  const [isImageAbsent, setIsImageAbsent] = useState(false);
  const NFTId = `${code.substring(0, 6)}...${code.substring(code.length - 6)}`;

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
          <PriceWithIcon price={price} color="red" size="m" />
          <PriceDifference
            direction={priceDifference.direction}
            percent={priceDifference.percent}
          />
        </div>
        <Username username={username} color="lightblue" isConfirmed/>
        <div className={styles.codeAndTag}>
          <p className={styles.code}>{NFTId}</p>
          <Tag text={tag} />
        </div>
      </div>
    </div>
  );
};
