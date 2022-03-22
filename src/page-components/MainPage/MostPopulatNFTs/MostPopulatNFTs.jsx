import { Filter } from "../../../components/Filter/Filter";
import styles from "./MostPopulatNFTs.module.css";

export const MostPopularNFTs = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleFilterButtonWrapper}>
        <p className={styles.title}>Most Popular NFTs</p>
        <Filter />
      </div>
    </div>
  );
};
