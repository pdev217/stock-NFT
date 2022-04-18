import { useEffect, useState } from "react";
//next
import Image from "next/image";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setOffers } from "../../../../redux/slices/offersSlice";
//classnames
import cn from "classnames";
//components
import { LeftTimeContainer } from "./LeftTimeContainer";
import { CustButton } from "../../../../components/CustButton/CustButton";
import { PriceHistory } from "./PriceHistory";
import { MakeOfferModal } from "../../../../modals/MakeOfferModal/MakeOfferModal";
import { TransferApprovalModal } from "../../../../modals/TransferApprovalModal/TransferApprovalModal";
//utils
import { getCorrectDateString } from "./RightSideInfoWrapper.utils";
import { getExpirationString } from "../../../../helpers/getExpirationString";
//styles
import styles from "./RightSideInfoWrapper.module.css";
import { AcceptOfferModal } from "../../../../modals/AcceptOfferModal/AcceptOfferModal";
import { useWeb3React } from "@web3-react/core";
//ethers
import { ethers } from "ethers";
//contract
import stokeNFTArtifacts from "../../../../../artifacts/contracts/StokeNFT.sol/StokeNFT.json";
import marketPlaceArtifacts from "../../../../../artifacts/contracts/StokeMarketPlace.sol/StokeMarketplace.json";
import tokenArtifacts from "../../../../../artifacts/contracts/WETH.sol/WETH9.json";

const fakeDate = new Date(2022, 6, 1, 2, 3, 4, 567);
console.log('---', process.env.TOKEN_ADDR)
const tokenAddr = process.env.TOKEN_ADDR;
const stokeMarketAddr = process.env.MARKET_ADDR;
const nftAddr = process.env.NFT_ADDR;
let tokenContract;
let marketContract;
let nftContract;

export const RightSideInfoWrapper = ({
  collection,
  ethPrice,
  likes,
  listing,
  name,
  offers,
  owner,
  tokenFileName,
  usdPrice,
}) => {
  const dispatch = useDispatch();
  const { account, library } = useWeb3React();
  const [saleEnds, setSaleEnds] = useState(undefined);
  const [saleEndsStringified, setSaleEndsStringified] = useState("");

  const offersData = useSelector((state) => state.offers.offers);
  const [listingData, setListingData] = useState(undefined);
  const [acceptModalData, setAcceptModalData] = useState(undefined);

  const [isListingOpened, setIsListingOpened] = useState(true);
  const [isOffersOpened, setIsOffersOpened] = useState(true);
  const [isPriceHistoryOpened, setIsPriceHistoryOpened] = useState(true);

  const [isMakeOfferModalOpened, setIsMakeOfferModalOpened] = useState(false);
  const [isAcceptOfferModalOpened, setIsAcceptOfferModalOpened] = useState(false);

  const handleAccept = async (price, id) => {
    setAcceptModalData({ price, name, collection, tokenFileName, id });
    setIsAcceptOfferModalOpened(true);
    // const wei = await tokenContract.balanceOf("0xdD2FD4581271e230360230F9337D5c0430Bf44C0");
    // const balance = ethers.utils.formatUnits(wei);
    // console.log(Number(balance))
    // if(Number(balance) === 0) {
    //   await tokenContract.deposit({from: account, value: ethers.utils.parseEther("0.01")})
    // }
    // const offerC = {
    //   sender: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    //   amount:1000000000000000,
    //   expiresAt: Date.now("2022-04-20")
    // }
    // const Token = {
    //   tokenId: 11125,
    //   tokenURI: "ipfs:lion"
    // }

    // const nftOwner = await nftContract.IsExistToken(1112);
    // console.log(nftOwner)

    // await marketContract.accept(offerC, tokenAddr, nftAddr, Token);
  };

  useEffect(() => {
    setSaleEnds(fakeDate);
    saleEnds && setSaleEndsStringified(getCorrectDateString(saleEnds));
  }, [saleEnds]);

  useEffect(() => {
    if (listing && listing.length > 0) {
      const array = listing.map((elem) => {
        return { ...elem, expiration: getExpirationString(elem.expiration) };
      });
      setListingData([...array]);
    }
  }, [listing]);

  //get contract
  useEffect(() => {
    const IToken = new ethers.ContractFactory(
      tokenArtifacts.abi,
      tokenArtifacts.deployedBytecode,
      library?.getSigner()
    );

    console.log('---tokenAddr', tokenAddr)
    tokenContract = IToken.attach(tokenAddr);

    const IMarket = new ethers.ContractFactory(
      marketPlaceArtifacts.abi,
      marketPlaceArtifacts.deployedBytecode,
      library?.getSigner()
    )
    marketContract = IMarket.attach(stokeMarketAddr);

    const IStokeNFT = new ethers.ContractFactory(
      stokeNFTArtifacts.abi,
      stokeNFTArtifacts.deployedBytecode,
      library?.getSigner()
    )
    nftContract = IStokeNFT.attach(nftAddr);
  }, [account, library]);

  useEffect(() => {
    dispatch(setOffers(offers));
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
            Owned by <span className={styles.link}>{owner || "Some owner"}</span>
          </span>
          <div className={styles.likes}>
            <Image src="/view-token/Icon-HeartFilled.svg" width={19} height={19} alt="heart-filled-icon" />
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
            <Image src="/view-token/Icon-Weth.svg" width={19} height={19} alt="eth-icon" />
            <div className={styles.ethPrice}>
              <span>{ethPrice}</span>
            </div>
            <span className={styles.greySmallText}>(${usdPrice})</span>
          </div>
          <div>
            <CustButton color="primary" text="Buy now" />
            <CustButton
              color="ghost"
              text="Make offer"
              onClick={() => setIsMakeOfferModalOpened(true)}
              className={styles.makeOfferButton}
            />
          </div>
        </div>
      </div>
      <div className={cn(styles.box, styles.listingsWrapper)}>
        <div className={styles.sectionHeader}>
          <Image src="/view-token/Icon-Description.svg" height={19} width={19} alt="description" />
          <div>
            <span>Listing</span>
            {isListingOpened ? (
              <Image
                src="/view-token/Icon-ArrowUp.svg"
                height={15}
                width={30}
                alt="arrow-down"
                onClick={() => setIsListingOpened(false)}
              />
            ) : (
              <Image
                src="/view-token/Icon-ArrowDown.svg"
                height={15}
                width={30}
                alt="arrow-up"
                onClick={() => setIsListingOpened(true)}
              />
            )}
          </div>
        </div>
        {listingData && listingData.length > 0 ? (
          <>
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
              {listingData.map(({ price: { eth, usd }, owner, expiration, id }) => (
                <div key={id} className={styles.tableRow}>
                  <div>
                    <Image src="/view-token/Icon-Weth.svg" height={19} width={19} alt="eth-icon" />
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
          </>
        ) : (
          <div
            className={cn(styles.emptySection, styles.opened, {
              [styles.closed]: !isListingOpened,
            })}
          >
            <span>No listings</span>
          </div>
        )}
      </div>
      <div className={cn(styles.box, styles.listingsWrapper)}>
        <div className={styles.sectionHeader}>
          <Image src="/view-token/Icon-Offers.svg" height={19} width={19} alt="description" />
          <div>
            <span>Offers</span>
            {isOffersOpened ? (
              <Image
                src="/view-token/Icon-ArrowUp.svg"
                height={15}
                width={30}
                alt="arrow-down"
                onClick={() => setIsOffersOpened(false)}
              />
            ) : (
              <Image
                src="/view-token/Icon-ArrowDown.svg"
                height={15}
                width={30}
                alt="arrow-up"
                onClick={() => setIsOffersOpened(true)}
              />
            )}
          </div>
        </div>
        {offersData && offersData.length > 0 ? (
          <>
            <div
              className={cn(styles.tableRow, styles.opened, styles.tableHead, {
                [styles.closed]: !isOffersOpened,
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
                [styles.closed]: !isOffersOpened,
              })}
            >
              {offersData.map(({ price, user, expirationDate, id }) => (
                <div key={id} className={styles.tableRow}>
                  <div>
                    <Image src="/view-token/Icon-Weth.svg" height={19} width={19} alt="eth-icon" />
                    <span className={cn(styles.priceText, styles.marginLeft4)}>{price} ETH</span>
                  </div>
                  <div>
                    <span className={styles.priceText}>$ 9999</span>
                  </div>
                  <div>
                    <span className={styles.greySmallText}>{expirationDate}</span>
                  </div>
                  <div>
                    <span className={styles.link}>{user.username?user.username:(user.publicAddress)?.slice(0,5)}</span>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <CustButton text="buy" color="ghost" onClick={() => handleAccept(price, id)} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className={cn(styles.emptySection, styles.opened, {
              [styles.closed]: !isOffersOpened,
            })}
          >
            <span>No offers</span>
          </div>
        )}
      </div>
      <div className={styles.box}>
        <div className={styles.sectionHeader}>
          <Image src="/view-token/Icon-Activity.svg" height={19} width={19} alt="Activity" />
          <div>
            <span>Price History</span>
            {isPriceHistoryOpened ? (
              <Image
                src="/view-token/Icon-ArrowUp.svg"
                height={15}
                width={30}
                alt="arrow-down"
                onClick={() => setIsPriceHistoryOpened(false)}
              />
            ) : (
              <Image
                src="/view-token/Icon-ArrowDown.svg"
                height={15}
                width={30}
                alt="arrow-up"
                onClick={() => setIsPriceHistoryOpened(true)}
              />
            )}
          </div>
        </div>
        <div>
         <PriceHistory isPriceHistoryOpened={isPriceHistoryOpened} />
        </div>
      </div>
      <MakeOfferModal
        isOpened={isMakeOfferModalOpened}
        handleClose={() => setIsMakeOfferModalOpened(false)}
      />
      <AcceptOfferModal
        {...acceptModalData}
        isOpened={isAcceptOfferModalOpened}
        handleClose={() => setIsAcceptOfferModalOpened(false)}
      />
    </div>
  );
};
