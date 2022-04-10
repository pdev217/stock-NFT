import { useEffect, useState } from "react";
//next
import Image from "next/image";
//classnames
import cn from "classnames";
//components
import { LeftTimeContainer } from "./LeftTimeContainer";
import { CustButton } from "../../../../components/CustButton/CustButton";
//utils
import { getCorrectDateString, getExpirationString } from "./RightSideInfoWrapper.utils";
//styles
import styles from "./RightSideInfoWrapper.module.css";

const fakeDate = new Date(2022, 6, 1, 2, 3, 4, 567);

export const RightSideInfoWrapper = ({
  collection,
  ethPrice,
  likes,
  listing,
  name,
  offers,
  owner,
  usdPrice,
}) => {
  const [saleEnds, setSaleEnds] = useState(undefined);
  const [saleEndsStringified, setSaleEndsStringified] = useState("");
  const [listingData, setListingData] = useState(undefined);
  const [offersData, setOffersData] = useState(undefined);
  const [isListingOpened, setIsListingOpened] = useState(true);
  const [isOffersOpened, setIsOffersOpened] = useState(true);

  useEffect(() => {
    setSaleEnds(fakeDate);
    saleEnds && setSaleEndsStringified(getCorrectDateString(saleEnds));
  }, [saleEnds]);

  useEffect(() => {
    if (listing.length > 0) {
      const array = [...listing];
      array.forEach((elem) => (elem.expiration = getExpirationString(elem.expiration)));
      setListingData([...array]);
    }
  }, [listing]);

  useEffect(() => {
    if (offers.length > 0) {
      const array = [...offers];
      array.length > 0 && array.forEach((elem) => (elem.expiration = getExpirationString(elem.expiration)));
      setOffersData([...array]);
    }
  }, [offers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tokenNameInfoWrapper}>
        <div className={styles.greySmallText}>
          <span className={styles.link}>{collection}</span>
        </div>
        <div className={styles.tokenName}>
          <span>{name}</span>
        </div>
        <div className={styles.ownerAndLikes}>
          <span className={styles.greySmallText}>
            Owned by <span className={styles.link}>{owner}</span>
          </span>
          <div className={styles.likes}>
            <Image src="/view-token/Icon:HeartFilled.svg" width={19} height={19} alt="heart-filled-icon" />
            <span className={styles.greySmallText}>{likes} Favorites</span>
          </div>
        </div>
      </div>
      <div className={cn(styles.box, styles.saleEndsPriceWrapper)}>
        <div className={styles.saleEnds}>
          <div>
            <span className={styles.greySmallText}>Sale ends {saleEndsStringified}</span>
          </div>
          <LeftTimeContainer endTime={saleEnds} />
        </div>
        <div className={styles.currentPriceWrapper}>
          <div>
            <span className={styles.greySmallText}>Current Price</span>
          </div>
          <div className={styles.priceInfo}>
            <Image src="/view-token/Icon:Weth.svg" width={19} height={19} alt="eth-icon" />
            <div className={styles.ethPrice}>
              <span>{ethPrice}</span>
            </div>
            <span className={styles.greySmallText}>(${usdPrice})</span>
          </div>
          <div>
            <CustButton color="primary" text="Buy now" />
            <CustButton color="ghost" text="Make offer" className={styles.makeOfferButton} />
          </div>
        </div>
      </div>
      <div className={cn(styles.box, styles.listingsWrapper)}>
        <div className={styles.sectionHeader}>
          <Image src="/view-token/Icon:Description.svg" height={19} width={19} alt="description" />
          <div>
            <span>Listing</span>
            {isListingOpened ? (
              <Image
                src="/view-token/Icon:ArrowUp.svg"
                height={15}
                width={30}
                alt="arrow-down"
                onClick={() => setIsListingOpened(false)}
              />
            ) : (
              <Image
                src="/view-token/Icon:ArrowDown.svg"
                height={15}
                width={30}
                alt="arrow-up"
                onClick={() => setIsListingOpened(true)}
              />
            )}
          </div>
        </div>
        <div
          className={cn(styles.tableRow, styles.opened, styles.tableHead, {
            [styles.closed]: !isListingOpened,
          })}
        >
          <div>
            <span>Price</span>
          </div>
          <div>
            <span>USD Price</span>
          </div>
          <div>
            <span>Expiration</span>
          </div>
          <div>
            <span>From</span>
          </div>
          <div className={styles.buttonWrapper}></div>
        </div>
        <div
          className={cn(styles.opened, {
            [styles.closed]: !isListingOpened,
          })}
        >
          {listingData &&
            listingData.length > 0 &&
            listingData.map(({ price: { eth, usd }, owner, expiration, id }) => (
              <div key={id} className={styles.tableRow}>
                <div>
                  <Image src="/view-token/Icon:Weth.svg" height={19} width={19} alt="eth-icon" />
                  <span className={cn(styles.priceText, styles.marginLeft4)}>{eth} ETH</span>
                </div>
                <div>
                  <span className={styles.priceText}>${usd}</span>
                </div>
                <div>
                  <span className={styles.greySmallText}>{expiration}</span>
                </div>
                <div>
                  <span className={styles.link}>{owner}</span>
                </div>
                <div className={styles.buttonWrapper}>
                  <CustButton text="buy" color="ghost" />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={cn(styles.box, styles.listingsWrapper)}>
        <div className={styles.sectionHeader}>
          <Image src="/view-token/Icon:Description.svg" height={19} width={19} alt="description" />
          <div>
            <span>Offers</span>
            {isOffersOpened ? (
              <Image
                src="/view-token/Icon:ArrowUp.svg"
                height={15}
                width={30}
                alt="arrow-down"
                onClick={() => setIsOffersOpened(false)}
              />
            ) : (
              <Image
                src="/view-token/Icon:ArrowDown.svg"
                height={15}
                width={30}
                alt="arrow-up"
                onClick={() => setIsOffersOpened(true)}
              />
            )}
          </div>
        </div>
        <div
          className={cn(styles.tableRow, styles.opened, styles.tableHead, {
            [styles.closed]: !isListingOpened,
          })}
        >
          <div>
            <span>Price</span>
          </div>
          <div>
            <span>USD Price</span>
          </div>
          <div>
            <span>Expiration</span>
          </div>
          <div>
            <span>From</span>
          </div>
          <div className={styles.buttonWrapper}></div>
        </div>
        <div
          className={cn(styles.opened, {
            [styles.closed]: !isListingOpened,
          })}
        >
          {offersData &&
            offersData.length > 0 &&
            offersData.map(({ price: { eth, usd }, owner, expiration, id }) => (
              <div key={id} className={styles.tableRow}>
                <div>
                  <Image src="/view-token/Icon:Weth.svg" height={19} width={19} alt="eth-icon" />
                  <span className={cn(styles.priceText, styles.marginLeft4)}>{eth} ETH</span>
                </div>
                <div>
                  <span className={styles.priceText}>${usd}</span>
                </div>
                <div>
                  <span className={styles.greySmallText}>{expiration}</span>
                </div>
                <div>
                  <span className={styles.link}>{owner}</span>
                </div>
                <div className={styles.buttonWrapper}>
                  <CustButton text="buy" color="ghost" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
