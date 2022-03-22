import { Filter } from "../../../components/Filter/Filter";
import { CustButton } from "../../../components/CustButton/CustButton";
import { ScrollableList } from "../../../components/ScrollableList/ScrollableList";
import { PopularNFTCard } from "../../../components/PopularNFTCard/PopularNFTCard";
import { fakeNFTs } from "./MostPopulatNFTs.utils";
import styles from "./MostPopulatNFTs.module.css";

export const MostPopularNFTs = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleFilterButtonWrapper}>
        <p className={styles.title}>Most Popular NFTs</p>
        <Filter
          src="/time-icon.svg"
          text="Last 7 days"
          className={styles.filter}
        />
        <CustButton text="Browse All" color="primary" />
      </div>
      <ScrollableList Component={PopularNFTCard} NFTs={fakeNFTs} />
    </div>
  );
};
