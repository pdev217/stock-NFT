import { useState, useEffect } from "react";
//next
import Image from "next/image";
//redux
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
import { useDispatch } from "react-redux";
//components
import { LeftSideInfoWrapper } from "./components/LeftSideInfoWrapper/LeftSideInfoWraper";
import { RightSideInfoWrapper } from "./components/RightSideInfoWrapper/RightSideInfoWrapper";
//fakeData
import { images, videos, audios } from "./ViewIndividualToken.utils";
//styles
import styles from "./ViewIndividualTokenPage.module.css";
import { BottomInfoWrapper } from "./components/BottomInfoWrapper/BottomInfoWrapper";

export const ViewIndividualTokenPage = ({
  status,
  name,
  fileName,
  externalLink,
  description,
  properties,
  levels,
  stats,
  username,
  blockchainName,
  collectionName,
  about,
}) => {
  const dispatch = useDispatch();

  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const [values, setValues] = useState({
    about,
    status,
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
        event: "Offers",
        price: {
          eth: 6.95,
          usd: 19494.06,
        },
        from: "Birds_of_Pray",
        to: "Son fo Anarchy Chris",
        date: new Date(2022, 1, 1, 2, 3, 4, 567),
        id: "1",
      },
      {
        event: "Offers",
        price: {
          eth: 6.95,
          usd: 19494.06,
        },
        from: "Birds_of_Pray",
        to: "Son fo Anarchy Chris",
        date: new Date(2022, 0, 1, 2, 3, 4, 567),
        id: "2",
      },
    ],
  });

  const handeError = (message, callback) => {
    callback();
    dispatch(openError(message));
  };

  useEffect(() => {
    const end = fileName.substring(fileName.indexOf(".") + 1).toLowerCase();

    if (images.includes(end)) {
      setTypeOfTokenFile("image");
    } else if (videos.includes(end)) {
      setTypeOfTokenFile("video");
    } else if (audios.includes(end)) {
      setTypeOfTokenFile("audio");
    }
  }, [fileName]);

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
                  src={
                    values.blockchainName === "Etherium"
                      ? "/view-token/Icon:Eth.svg"
                      : "/view-token/Polygon.svg"
                  }
                  width={19}
                  height={19}
                  alt="blockchain-type"
                  onError={() =>
                    handeError("Something went wrong with blockchain type", () =>
                      setImageErrors({ ...imageErrors, blockchainTypeIcon: true })
                    )
                  }
                />
              )}
              <div className={styles.likesWrapper}>
                <Image src="/view-token/Icon:Heart.svg" width={19} height={19} alt="likes" />
                <span>{values.likes}</span>
              </div>
            </div>
            <div className={styles.tokenImageContainer}>
              <div className={styles.tokenImage}>
                {typeOfTokenFile === "image" && imageErrors.tokenImage ? (
                  <Image src="/noImage.png" layout="fill" alt="token-image" />
                ) : (
                  <img src={values.tokenImageLink} alt="token-image" />
                )}
                {typeOfTokenFile === "video" && (
                  <video src={values.tokenImageLink} controls="controls" autoPlay="true" alt="token-video" />
                )}
                {typeOfTokenFile === "audio" && (
                  <audio src={values.tokenImageLink} controls="controls" autoPlay="true" alt="token-video" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.leftSideInfoWrapper}>
            <LeftSideInfoWrapper
              owner={values.username}
              description={values.description}
              properties={values.properties}
              status={values.status}
              about={values.about}
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
