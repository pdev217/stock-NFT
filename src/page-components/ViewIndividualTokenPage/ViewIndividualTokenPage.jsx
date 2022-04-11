import { useState, useEffect } from "react";
//next
import Image from "next/image";
//axios
import axios from "axios";
//components
import { LeftSideInfoWrapper } from "./components/LeftSideInfoWrapper/LeftSideInfoWraper";
import { RightSideInfoWrapper } from "./components/RightSideInfoWrapper/RightSideInfoWrapper";
//fakeData
import { fakeServerData } from "./fakeData";
//styles
import styles from "./ViewIndividualTokenPage.module.css";
import { BottomInfoWrapper } from "./components/BottomInfoWrapper/BottomInfoWrapper";

export const ViewIndividualTokenPage = ({
  name,
  fileName,
  externalLink,
  description,
  properties,
  levels,
  stats,
  username,
  blockchainName,
  collectionName
}) => {
  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });
  const [values, setValues] = useState({
    likes: 15,
    externalLink,
    tokenImageLink: `${process.env.BACKEND_WITHOUT_API}/assets/nftMedia/${fileName}`,
    blockchainName,
    collectionName,
    description,
    owner: username,
    properties,
    levels,
    stats,
    username,
    name,
    price: {
      eth: 0.211,
      usd: 667.75,
    },
    listing: [
      {
        price: {
          eth: 1.0577,
          usd: 667.75,
        },
        expiration: new Date(2022, 6, 1, 2, 3, 4, 567),
        owner: "CreVthor",
        id: "1",
      },
      {
        price: {
          eth: 1.0677,
          usd: 687.75,
        },
        expiration: new Date(2022, 3, 12, 1, 3, 4, 567),
        owner: "Darth Vader",
        id: "2",
      },
    ],
    offers: [
      {
        price: {
          eth: 1.0577,
          usd: 667.75,
        },
        expiration: new Date(2022, 6, 1, 2, 3, 4, 567),
        owner: "CreVthor",
        id: "1",
      },
      {
        price: {
          eth: 1.0677,
          usd: 687.75,
        },
        expiration: new Date(2022, 3, 12, 1, 3, 4, 567),
        owner: "Darth Vader",
        id: "2",
      },
    ],
    activity: [
      {
          event: 'Offers',
          price: {
              eth: 6.95,
              usd: 19494.06
          },
          from: 'Birds_of_Pray',
          to: 'Son fo Anarchy Chris',
          date: new Date(2022, 1, 1, 2, 3, 4, 567),
          id: '1'
      },
      {
          event: 'Offers',
          price: {
              eth: 6.95,
              usd: 19494.06
          },
          from: 'Birds_of_Pray',
          to: 'Son fo Anarchy Chris',
          date: new Date(2022, 0, 1, 2, 3, 4, 567),
          id: '2'
      },
    ]
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        <div className={styles.leftSide}>
          <div className={styles.tokenImageWrapper}>
            <div className={styles.blockchainTypeAndLikes}>
              {imageErrors.blockchainTypeIcon ? (
                <Image src="/noImage.png" layout="fill" alt="token-image" />
              ) : (
                <Image
                  src={values.blockchainName === "Etherium" && "/view-token/Icon:Eth.svg"}
                  width={19}
                  height={19}
                  alt="blockchain-type"
                  onError={() => setImageErrors({ ...imageErrors, blockchainTypeIcon: true })}
                />
              )}
              <div className={styles.likesWrapper}>
                <Image src="/view-token/Icon:Heart.svg" width={19} height={19} alt="likes" />
                <span>{values.likes}</span>
              </div>
            </div>
            <div className={styles.tokenImageContainer}>
              <div className={styles.tokenImage}>
                {imageErrors.tokenImage ? (
                  <Image src="/noImage.png" layout="fill" alt="token-image" />
                ) : (
                  <img
                    src={values.tokenImageLink}
                    alt="token-image"
                    onError={(e) => e && setImageErrors({ ...imageErrors, tokenImage: true })}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.leftSideInfoWrapper}>
            <LeftSideInfoWrapper
              owner={values.username}
              description={values.description}
              properties={values.properties}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <RightSideInfoWrapper
            collection={values.collectionName}
            username={values.username}
            name={values.name}
            owner={values.username}
            offers={values.offers}
            likes={values.likes}
            usdPrice={values.price.usd}
            ethPrice={values.price.eth}
            listing={values.listing}
          />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <BottomInfoWrapper activity={values.activity} />
      </div>
    </div>
  );
};
