import { useState } from "react";
import Image from "next/image";
import { BigCategoryCard } from "../../../components/BigCategoryCard/BigCategoryCard";
import { CustButton } from "../../../components/CustButton/CustButton";
import { fakeCollections } from "./Collections.utils";
import styles from "./Collections.module.css";

export const Collections = () => {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/white-bubbles-background-image.png"
        layout="fill"
        alt="background-image"
      />
      <div className={styles.collections}>
        {fakeCollections.map(({ title, categoryName, src, id }) => (
          <BigCategoryCard
            categoryName={categoryName}
            key={id}
            src={src}
            title={title}
          />
        ))}
      </div>
      <div className={styles.autcionTitleAndButtonwrapper}>
        <p className={styles.auctionTitle}>Special Auction NFTs</p>
        <CustButton text="Browse All" color="primary" />
      </div>
    </div>
  );
};
