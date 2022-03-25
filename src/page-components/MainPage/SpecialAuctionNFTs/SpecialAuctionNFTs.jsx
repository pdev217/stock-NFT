import { Mainpage3dCarousel } from "../../../components/3dMainpageCarousel/Mainpage3dCarousel";
import { NFTCards } from "./SpecialAuctionNFTs.utils";
import styles from "./SpecialAuctionNFTs.module.css";

// Title for this division is located in the Collections division 
// because the background of Collections covers this title

export const SpecialAuctionNFTs = ({}) => {
  return (
    <div className={styles.wrapper}>
      <Mainpage3dCarousel NFTCards={NFTCards} />
    </div>
  );
};
