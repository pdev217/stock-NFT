import { useState, useEffect } from "react";
//next
import Image from "next/image";
//styles
import styles from "./ViewIndividualTokenPage.module.css";

const fakeServerData = {
  likes: 15,
  tokenImageLink: "/",
  blockchainType: "etherium",
  description:
    "A Woman can be everything she wants. For 10 years, it has been our mission to educate and empower the next generation of Women and Girls. The Boss Beauties Collection is an extension of the same passion and goals we have championed for the past decade. This is a collection of 10,000 unique, independent and strong Women which are also used to access exclusive virtual events and more.",
  owner: "King Crypto",
};

export const ViewIndividualTokenPage = () => {
  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });

  const [values, setValues] = useState({
    likes: 0,
    tokenImageLink: `/`,
    blockchainType: "etherium",
    description: "",
    owner: "",
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
                  src={values.blockchainType === 'etherium' && "/view-token/Icon:Eth.svg"}
                  width={19}
                  height={19}
                  alt="blockchain-type"
                  onError={() => setImageErrors({...imageErrors, blockchainTypeIcon: true})}
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
                  <Image src="/noImage.png" layout="fill" alt="token-image"/>
                ) : (
                  <Image
                    src={values.tokenImageLink}
                    layout="fill"
                    alt="token-image"
                    onError={() => setImageErrors({...imageErrors, tokenImage: true})}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.leftSideInfoWrapper}>
            
          </div>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  );
};
