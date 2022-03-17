import { useState, useEffect } from "react";
import { CustButton } from "../CustButton/CustButton";
import { SpecialAuctionNFTCard } from "../SpecialAuctionNFTCard/SpecialAuctionNFTCard";
import styles from "./Mainpage3dCarousel.module.css";

export const Mainpage3dCarousel = ({ NFTCards }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((current) => {
      const res = current === NFTCards.length - 1 ? 0 : current + 1;
      return res;
    });
  };

  const goPrev = () => {
    setActiveIndex((current) => {
      const res = current === 0 ? NFTCards.length - 1 : current - 1;
      return res;
    });
  };

  const prevImgIndex = activeIndex ? activeIndex - 1 : NFTCards.length - 1;
  // Вычисляем индекс следующего слайда
  const nextImgIndex =
    activeIndex === NFTCards.length - 1 ? 0 : activeIndex + 1;

  return (
    <>
      <div className={styles.wrapper}>
        <SpecialAuctionNFTCard
          className={styles.prevCard}
          NFTName={NFTCards[prevImgIndex].NFTName}
          time={NFTCards[prevImgIndex].time}
          author={NFTCards[prevImgIndex].author}
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
          className={styles.currCard}
          NFTName={NFTCards[activeIndex].NFTName}
          time={NFTCards[activeIndex].time}
          author={NFTCards[activeIndex].author}
          code={NFTCards[activeIndex].code}
          currPrice={NFTCards[activeIndex].currPrice}
          prevPrices={NFTCards[activeIndex].prevPrices}
          chartData={NFTCards[activeIndex].chartData}
          views={NFTCards[activeIndex].views}
          src={NFTCards[activeIndex].src}
          tag={NFTCards[activeIndex].tag}
          key={NFTCards[activeIndex].id}
        />
        <SpecialAuctionNFTCard
          className={styles.nextCard}
          NFTName={NFTCards[nextImgIndex].NFTName}
          time={NFTCards[nextImgIndex].time}
          author={NFTCards[nextImgIndex].author}
          code={NFTCards[nextImgIndex].code}
          currPrice={NFTCards[nextImgIndex].currPrice}
          prevPrices={NFTCards[nextImgIndex].prevPrices}
          chartData={NFTCards[nextImgIndex].chartData}
          views={NFTCards[nextImgIndex].views}
          src={NFTCards[nextImgIndex].src}
          tag={NFTCards[nextImgIndex].tag}
          key={NFTCards[nextImgIndex].id}
        />
      </div>
      <CustButton color="primary" text="prev" onClick={goPrev} />
      <CustButton color="primary" text="next" onClick={goNext} />
    </>
  );
};
