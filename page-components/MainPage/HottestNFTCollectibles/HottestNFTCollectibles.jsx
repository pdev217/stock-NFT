import styles from "./HottestNFTCollectibles.module.css";
import Image from "next/image";
// components
import { BigMainpageCollectionInfo } from "../../../src/components/BigMainpageCollectionInfo/BigMainpageCollectionInfo";
import { HorizontalNFTCard } from "../../../src/components/HorizontalNFTCard/HorizontalNFTCard";

const fakeChartData = [
  { name: "Page A", price: 500 },
  { name: "Page A", price: 510 },
  { name: "Page A", price: 300 },
  { name: "Page A", price: 530 },
  { name: "Page A", price: 200 },
  { name: "Page A", price: 250 },
  { name: "Page A", price: 675 },
  { name: "Page A", price: 344 },
  { name: "Page A", price: 300 },
  { name: "Page A", price: 530 },
  { name: "Page A", price: 560 },
];

export const HottestNFTCollectibles = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        layout="fill"
        src="/mainpage-smoke-background.png"
        alt="background-with-smoke"
      />
      <div className={styles.leftSide}>
        <BigMainpageCollectionInfo
          className={styles.bigMainpageCollectionInfo}
          title={"Rookie Maikel Franco Limited Bobblehead!"}
          upperCaseText={"ONLY 1,000 MINTED!"}
          discount={150}
          src="/test-big-collection-image.png"
        />
        <HorizontalNFTCard
          className={styles.horizontalNFTCard}
          username={"MLB"}
          availible={247}
          chartData={fakeChartData}
          lastUpdate={24}
          price={122.48}
          priceDifference={{
            direction: "up",
            difference: 12.34,
          }}
          rewards={"rare"}
          tag="Athletes"
          title={"Maikel Franco"}
          src="/"
        />
      </div>
    </div>
  );
};
