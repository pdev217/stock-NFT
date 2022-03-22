import { CustButton } from "../../../components/CustButton/CustButton";
import { PopularNFTCard } from "../../../components/PopularNFTCard/PopularNFTCard";
import { fakeNFTs } from "./TrendingNFTs.utils";
import styles from "./TrendingNFTs.module.css";

export const TrendingNFTs = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleAndbuttonWrapper}>
        <div>Trending NFTs</div>
        <CustButton color="primary" text="Browse All" />
      </div>
      <div className={styles.sliderWrapper}>
        {fakeNFTs.map(
          ({
            account,
            id,
            price,
            priceDifference,
            rewards,
            src,
            tag,
            title,
            username,
          }) => (
            <PopularNFTCard
              className={styles.card}
              account={account}
              key={id}
              price={price}
              priceDifference={priceDifference}
              rewards={rewards}
              src={src}
              tag={tag}
              title={title}
              username={username}
            />
          )
        )}
      </div>
    </div>
  );
};
