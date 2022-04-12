import { useState, useEffect, useLayoutEffect } from "react";
//next
import Image from "next/image";
//redux
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
import { useDispatch } from "react-redux";
//components
import { LeftSideInfoWrapper } from "./components/LeftSideInfoWrapper/LeftSideInfoWraper";
import { RightSideInfoWrapper } from "./components/RightSideInfoWrapper/RightSideInfoWrapper";
import { BottomInfoWrapper } from "./components/BottomInfoWrapper/BottomInfoWrapper";
//fakeData
import {
  audios,
  fakeActivity,
  fakeLikes,
  fakeListing,
  fakeOffers,
  fakePrice,
  images,
  videos,
} from "./ViewIndividualToken.utils";
//styles
import styles from "./ViewIndividualTokenPage.module.css";

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
  console.log("---fileName", fileName);

  const [imageErrors, setImageErrors] = useState({
    tokenImage: false,
    blockchainTypeIcon: false,
  });

  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const [tokenFileLink, setTokenFileLink] = useState("/");

  const [ratio, setRatio] = useState(16 / 9);

  const handleError = (message, callback) => {
    callback();
    dispatch(openError(message));
  };

  const tokenImageLoader = () => {
    return `${process.env.BACKEND_WITHOUT_API}/assets/nftMedia/${fileName}`;
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
  console.log("---typeOfTokenImage", typeOfTokenFile);

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
                  src={blockchainName === "Etherium" ? "/view-token/Icon:Eth.svg" : "/view-token/Polygon.svg"}
                  width={19}
                  height={19}
                  alt="blockchain-type"
                  onError={(e) =>
                    handleError("Something went wrong with blockchain type", () =>
                      setImageErrors({ ...imageErrors, blockchainTypeIcon: true })
                    )
                  }
                />
              )}
              <div className={styles.likesWrapper}>
                <Image src="/view-token/Icon:Heart.svg" width={19} height={19} alt="likes" />
                <span>{fakeLikes}</span>
              </div>
            </div>
            <div className={styles.tokenImageContainer}>
              <div className={styles.tokenImage}>
                {typeOfTokenFile === "image" && imageErrors.tokenImage ? (
                   <div className={styles.emptySection}>
                   <span>No file</span>
                 </div>
                ) : (
                  <Image
                    src={tokenFileLink}
                    loader={tokenImageLoader}
                    alt="toke2n-image"
                    objectFit="contain"
                    layout="responsive"
                    width="100%"
                    height={`${ratio}%`}
                    onError={() =>
                      handleError("404 Token file is not found", () =>
                        setImageErrors({ ...imageErrors, tokenImage: true })
                      )
                    }
                    onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                      setRatio(100 / (naturalWidth / naturalHeight))
                    }
                  />
                )}
                {typeOfTokenFile === "video" && (
                  <video
                    src={tokenFileLink}
                    controls="controls"
                    autoPlay="true"
                    alt="token-video"
                    className={styles.video}
                  />
                )}
                {typeOfTokenFile === "audio" && (
                  <audio
                    src={tokenFileLink}
                    controls="controls"
                    autoPlay="true"
                    alt="token-video"
                    className={styles.audio}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.leftSideInfoWrapper}>
            <LeftSideInfoWrapper
              owner={username}
              description={description}
              properties={properties}
              levels={levels}
              status={status}
              stats={stats}
              about={about}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          <RightSideInfoWrapper
            collection={collectionName}
            name={name}
            owner={username}
            /// fake data

            offers={fakeOffers}
            likes={fakeLikes}
            usdPrice={fakePrice.usd}
            ethPrice={fakePrice.eth}
            listing={fakeListing}

            ///
          />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <BottomInfoWrapper activity={fakeActivity} />
      </div>
    </div>
  );
};
