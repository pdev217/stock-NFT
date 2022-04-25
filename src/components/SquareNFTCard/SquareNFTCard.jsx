import { useState, useRef, useEffect } from "react";
//next
import Image from "next/image";
//spinner
import { Oval } from "react-loader-spinner";
//utils
import { videos, audios, images } from "../../helpers/extentions";
//styles
import styles from "./SquareNFTCard.module.scss";

export const SquareNFTCard = ({ name, category, status, price, username, fileName }) => {
  const [tokenFileError, setTokenFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();

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

  useEffect(() => {
    if (audioRef.current?.src || videoRef.current?.src) {
      setIsLoading(false);
    }
  }, [typeOfTokenFile]);

  const imageLoader = ({ src }) => `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`;

  const videoRef = useRef();
  const audioRef = useRef();

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        {isLoading && (
          <div className={styles.spinner}>
            <Oval
              ariaLabel="loading-indicator"
              color="var(--black)"
              height={70}
              secondaryColor="var(--light-grey)"
              strokeWidth={3}
              width={70}
            />
          </div>
        )}
        {tokenFileError ? (
          <div className={styles.emptySection}>
            <span>No file</span>
          </div>
        ) : (
          <>
            {typeOfTokenFile === "image" && (
              <Image
                alt="token-image"
                layout="fill"
                loader={imageLoader}
                onError={() => setTokenFileError(true)}
                onLoadingComplete={() => setIsLoading(false)}
                src={fileName}
              />
            )}
            {typeOfTokenFile === "video" && (
              <video
                alt="token-video"
                autoPlay={false}
                className={styles.video}
                controls="controls"
                onError={() => setTokenFileError(true)}
                ref={videoRef}
                src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`}
              />
            )}
            {typeOfTokenFile === "audio" && (
              <audio
                alt="token-audio"
                autoPlay={false}
                className={styles.audio}
                controls="controls"
                ref={audioRef}
                src={`${process.env.BACKEND_ASSETS_URL}/nftMedia/${fileName}`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
