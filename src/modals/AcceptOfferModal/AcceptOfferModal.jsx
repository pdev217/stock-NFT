import { useEffect, useState, useRef, useLayoutEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//classnames
import cn from "classnames";
//axios
import axios from "axios";
//mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, MenuItem, TextField, Checkbox } from "@mui/material";
//spinner
import { Oval } from "react-loader-spinner";
//components
import { CustButton } from "../../components/CustButton/CustButton";
import { ChooseWalletBox } from "../../components/ChooseWalletBox/ChooseWalletBox";
//hooks
import useAuth from "../../hooks/useAuth";
import { useStyles } from "../../hooks/useStyles";
//utils
import {
  images,
  videos,
  audios,
} from "../../page-components/ViewIndividualTokenPage/ViewIndividualToken.utils";
//styles
import { styles as jsStyles } from "./AcceptOfferModal.utils";
import cssStyles from "./AcceptOfferModal.module.css";

export const AcceptOfferModal = ({ isOpened, handleClose, price, name, collection, tokenFileName }) => {
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const [tokenFileLink, setTokenFileLink] = useState("/");
  const [isFileLoading, setIsFileLoading] = useState(true);
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const [videoSizes, setVideoSizes] = useState();

  const { stokeFee, creatorRoyalty } = useSelector((state) => state.administration.fees);

  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    if (tokenFileName) {
      const end = tokenFileName.substring(tokenFileName.indexOf(".") + 1).toLowerCase();
      if (images.includes(end)) {
        setTypeOfTokenFile("image");
      } else if (videos.includes(end)) {
        setTypeOfTokenFile("video");
        setTokenFileLink(`${process.env.BACKEND_ASSETS_URL}/nftMedia/${tokenFileName}`);
      } else if (audios.includes(end)) {
        setIsFileLoading(false)
        setTypeOfTokenFile("audio");
      }
    }
  }, [tokenFileName]);

  useEffect(() => {
    if (typeOfTokenFile === "video" && videoRef.current?.src) {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;
      const ratio = width / height;
      setVideoSizes({
        width: "70px",
        height: `${70 / ratio}px`,
      });
    }

    if (audioRef.current?.src || videoRef.current?.src) {
      setIsFileLoading(false);
    }
  }, [typeOfTokenFile]);

  const dispatch = useDispatch();
  const { isAuthorized } = useAuth();

  const handleFileError = () => {
    dispatch(openError("404 Token image is not found"));
  };

  const handleLoadImage = (width, height) => {
    setImageRatio(width / height);
  };

  const imageLoader = ({ src }) => {
    setIsFileLoading(false);
    return `${process.env.BACKEND_ASSETS_URL}/nftMedia/${src}`;
  };

  return (
    <Modal
      open={isOpened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={jsStyles.wrapper}>
        {isAuthorized ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
              <span>Accept offer</span>
              <div className={cssStyles.cross} onClick={handleClose}>
                <Image
                  src="/create-nft/Icon-Close.svg"
                  alt="close-icon"
                  width={15}
                  height={15}
                  onClick={handleClose}
                />
              </div>
            </Typography>
            <div className={cssStyles.section}>
              <span>Item</span>
              <span>Subtotal</span>
            </div>
            <div className={cssStyles.section}>
              <div className={cssStyles.tokenInfoWrapper}>
                <div
                  className={cssStyles.tokenFileWrapper}
                  style={{
                    height:
                      (typeOfTokenFile === "video" && videoRef.current && videoSizes.height) ||
                      (typeOfTokenFile === "audio" && "70px"),
                  }}
                >
                  {isFileLoading && (
                    <div className={cssStyles.spinner}>
                      <Oval
                        ariaLabel="loading-indicator"
                        height={30}
                        width={30}
                        strokeWidth={3}
                        color="var(--black)"
                        secondaryColor="var(--light-grey)"
                      />
                    </div>
                  )}
                  {typeOfTokenFile === "image" && (
                    <Image
                      src={tokenFileName}
                      loader={imageLoader}
                      width={70}
                      height={70 / imageRatio}
                      objectFit="contain"
                      layout="responsive"
                      alt="token-image"
                      onError={handleFileError}
                      onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                        handleLoadImage(naturalWidth, naturalHeight)
                      }
                    />
                  )}
                  {typeOfTokenFile === "video" && (
                    <video src={tokenFileLink} alt="token-video" ref={videoRef} className={cssStyles.video} />
                  )}
                  {typeOfTokenFile === "audio" && (
                    <div className={cssStyles.audio}>
                      <div>{tokenFileName.substring(tokenFileName.length - 3)}</div>
                      <div>file</div>
                    </div>
                  )}
                </div>
                <div className={cssStyles.tokenNameWrapper}>
                  <div className={cssStyles.greySmallText}>
                    <span>{collection}</span>
                  </div>
                  <div className={cn(cssStyles.whiteText, cssStyles.marginTop4)}>
                    <span>{name}</span>
                  </div>
                </div>
              </div>
              <div className={cssStyles.priceWrapper}>
                <div className={cssStyles.whiteText}>
                  <Image src="/view-token/Icon-Weth.svg" height={19} width={19} alt="weth-icon" />
                  <span className={cssStyles.marginLeft4}>{price}</span>
                </div>
                <div className={cn(cssStyles.greySmallText, cssStyles.marginTop4)}>
                  <span>$ fakeAmount</span>
                </div>
              </div>
            </div>
            <div className={cn(cssStyles.section, cssStyles.columnDown)}>
              <div className={cssStyles.feeNamesWrapper}>
                <div className={cn(cssStyles.whiteText, cssStyles.marginBottom16)}>
                  <span>Fees</span>
                </div>
                <div className={cn(cssStyles.greySmallText, cssStyles.marginBottom16)}>
                  <span>Stoke Fee</span>
                </div>
                <div className={cssStyles.greySmallText}>
                  <span>Creator royalty</span>
                </div>
              </div>
              <div className={cssStyles.feeDataWrapper}>
                <div className={cn(cssStyles.whiteText, cssStyles.marginBottom16)}>
                  <span>{stokeFee}%</span>
                </div>
                <div className={cssStyles.whiteText}>
                  <span>{creatorRoyalty}%</span>
                </div>
              </div>
            </div>
            <div className={cn(cssStyles.section, cssStyles.columnDown)}>
              <div className={cssStyles.feeNamesWrapper}>
                <div className={cn(cssStyles.whiteText, cssStyles.marginBottom16)}>
                  <span>Total</span>
                </div>
              </div>
              <div className={cssStyles.feeDataWrapper}>
                <div className={cn(cssStyles.bigWhiteText, cssStyles.marginBottom4)}>
                  <Image src="/view-token/Icon-Weth.svg" height={19} width={19} alt="weth-icon" />
                  <span className={cssStyles.marginLeft4}>fakeTotal</span>
                </div>
                <div className={cssStyles.greySmallText}>
                  <span>$fakeAmount</span>
                </div>
              </div>
            </div>
            <footer className={cssStyles.footer}>
              <CustButton color="primary" text="Accept Offer" />
            </footer>
          </>
        ) : (
          <div className={cssStyles.chooseBoxWrapper}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
              <span>Please connect wallet</span>
              <div className={cssStyles.cross} onClick={handleClose}>
                <Image
                  src="/create-nft/Icon-Close.svg"
                  alt="close-icon"
                  width={15}
                  height={15}
                  onClick={handleClose}
                />
              </div>
            </Typography>
            <ChooseWalletBox />
          </div>
        )}
      </Box>
    </Modal>
  );
};
