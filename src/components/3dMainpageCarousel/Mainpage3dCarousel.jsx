import { useState } from "react";
import cn from "classnames";
import { CustButton } from "../CustButton/CustButton";
import { SpecialAuctionNFTCard } from "../SpecialAuctionNFTCard/SpecialAuctionNFTCard";
import styles from "./Mainpage3dCarousel.module.css";

export const Mainpage3dCarousel = ({ NFTCards }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [translation, setTranslation] = useState(0);

  const goNext = () => {
    setTranslation((prev) => prev + 100);
  };

  const goPrev = () => {
    setTranslation((prev) => prev - 100);
  };

  const prevImgIndex = activeIndex ? activeIndex - 1 : NFTCards.length - 1;
  const nextImgIndex = activeIndex === NFTCards.length - 1 ? 0 : activeIndex + 1;

  return (
    <>
      <div className={styles.wrapper}>
        <SpecialAuctionNFTCard
          styling={{ transform: `translateX(${translation}%)`, transition: "0.3s" }}
          NFTName={NFTCards[prevImgIndex].NFTName}
          time={NFTCards[prevImgIndex].time}
          username={NFTCards[prevImgIndex].username}
          code={NFTCards[prevImgIndex].code}
          currPrice={NFTCards[prevImgIndex].currPrice}
          prevPrices={NFTCards[prevImgIndex].prevPrices}
          chartData={NFTCards[prevImgIndex].chartData}
          views={NFTCards[prevImgIndex].views}
          src={NFTCards[prevImgIndex].src}
          tag={NFTCards[prevImgIndex].tag}
          key={NFTCards[prevImgIndex].id}
        />
        <SpecialAuctionNFTCard
          styling={{ transform: `translateX(${translation}%) rotateY(50deg) perspective(500px)`, transition: "0.3s",  }}
          NFTName={NFTCards[prevImgIndex].NFTName}
          time={NFTCards[prevImgIndex].time}
          username={NFTCards[prevImgIndex].username}
          code={NFTCards[prevImgIndex].code}
          currPrice={NFTCards[prevImgIndex].currPrice}
          prevPrices={NFTCards[prevImgIndex].prevPrices}
          chartData={NFTCards[prevImgIndex].chartData}
          views={NFTCards[prevImgIndex].views}
          src={NFTCards[prevImgIndex].src}
          tag={NFTCards[prevImgIndex].tag}
          key={NFTCards[prevImgIndex].id}
        />
      </div>
      <CustButton color="primary" text="prev" onClick={goPrev} />
      <CustButton color="primary" text="next" onClick={goNext} />
    </>
  );
};
