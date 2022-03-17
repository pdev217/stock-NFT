import { useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import { SpecialAuctionNFTCard } from "../SpecialAuctionNFTCard/SpecialAuctionNFTCard";
import styles from "./Mainpage3dCarousel.module.css";

export const Mainpage3dCarousel = ({ NFTCards }) => {
  return (
  <div className={styles.wrapper}>
    {NFTCards.map((card) => {
      <SpecialAuctionNFTCard 
      NFTName={card.NFTName}
      time={card.time}
      author={card.author}
      code={card.code}
      currPrice={card.currPrice}
      prevPrices={card.prevPrices}
      chartData={card.chartData}
      views={card.views}
      src={card.src}
      tag={card.tag}
      />
    })}
  </div>);
};
