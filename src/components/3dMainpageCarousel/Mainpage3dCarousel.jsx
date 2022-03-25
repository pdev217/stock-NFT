import { useState } from "react";
import cn from "classnames";
import { SpecialAuctionNFTCard } from "../SpecialAuctionNFTCard/SpecialAuctionNFTCard";
import styles from "./Mainpage3dCarousel.module.css";

export const Mainpage3dCarousel = ({ NFTCards }) => {
  const [activeI, setactiveI] = useState(2);
  const [translation, setTranslation] = useState(0);

  const handleClick = (i) => {
    const difference = activeI - i;

    setTranslation((prev) => prev + difference * 100);
    setactiveI(i);
  };

  const getRotation = (i) => {
    const degree = 20;

    if (i < activeI) {
      const difference = activeI - i;
      return `rotateY(${degree * difference}deg)`;
    }

    if (i > activeI) {
      const difference = i - activeI;
      return `rotateY(-${degree * difference}deg)`;
    }

    return "";
  };

  const getZIndex = (i) => {
    if (i > activeI) {
      return NFTCards.length - (i - activeI);
    }

    if (i < activeI) {
      return NFTCards.length - (activeI - i);
    }

    return NFTCards.length;
  };

  return (
    <div className={styles.wrapper}>
      {NFTCards.map((card, i) => (
        <SpecialAuctionNFTCard
          styling={{
            transform: `perspective(500px) translateX(${translation}%) ${getRotation(i)}`,
            transition: "0.3s",
            zIndex: `${Math.abs(getZIndex(i))}`,
          }}
          onClick={() => handleClick(i)}
          NFTName={card.NFTName}
          time={card.time}
          username={card.username}
          code={card.code}
          currPrice={card.currPrice}
          prevPrices={card.prevPrices}
          chartData={card.chartData}
          views={card.views}
          src={card.src}
          tag={card.tag}
          key={card.id}
        />
      ))}
    </div>
  );
};
