import { useState, useEffect } from "react";
//next
import Image from "next/image";
//components
import { LeftSideInfoWrapper } from "./components/LeftSideInfoWrapper/LeftSideInfoWraper";
import { RightSideInfoWrapper } from "./components/RightSideInfoWrapper/RightSideInfoWrapper";
//fakeData
import { fakeServerData } from "./fakeData";
//styles
import styles from "./ViewIndividualTokenPage.module.css";

export const ViewIndividualTokenPage = () => {
  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });

  const [values, setValues] = useState({
    likes: 0,
    tokenImageLink: `/`,
    blockchainType: "etherium",
    collection: "",
    description: "",
    owner: "",
    properties: [],
    name: "",
    price: {
      eth: 0,
      usd: 0,
    },
    listing: [],
    offers: []
  });

  useEffect(() => {
    setValues({ ...fakeServerData });
  }, []);

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
                  src={values.blockchainType === "etherium" && "/view-token/Icon:Eth.svg"}
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
                  <Image
                    src={values.tokenImageLink}
                    layout="fill"
                    alt="token-image"
                    onError={() => setImageErrors({ ...imageErrors, tokenImage: true })}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.leftSideInfoWrapper}>
            <LeftSideInfoWrapper
              owner={values.owner}
              description={values.description}
              properties={values.properties}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <RightSideInfoWrapper
            collection={values.collection}
            name={values.name}
            owner={values.owner}
            likes={values.likes}
            usdPrice={values.price.usd}
            ethPrice={values.price.eth}
            listing={values.listing}
            offers={values.offers}
          />
        </div>
      </div>
    </div>
  );
};
