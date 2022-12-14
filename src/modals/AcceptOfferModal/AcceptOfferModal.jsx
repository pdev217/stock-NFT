import { useEffect, useState, useRef } from 'react';
//next
import { useRouter } from 'next/router';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { open as openError } from '../../redux/slices/errorSnackbarSlice';
import { open as openSuccess } from '../../redux/slices/successfulOrderSlice';
//next
import Image from 'next/image';
//classnames
import cn from 'classnames';
//axios
import axios from 'axios';
//mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//spinner
import { Oval } from 'react-loader-spinner';
//components
import { CustButton } from '../../components/CustButton/CustButton';
import { ChooseWalletBox } from '../../components/ChooseWalletBox/ChooseWalletBox';
//hooks
import useAuth from '../../hooks/useAuth';
//utils
import { images, videos, audios } from '../../helpers/extentions';
import { toHex, Offer, switchNetwork, getEtherPrice } from '../../utils';
//styles
import { styles as jsStyles } from '../modalStyles/modalJsStyles';
import cssStyles from './AcceptOfferModal.module.css';
//ethers
import { ethers } from 'ethers';
//web3
import { useWeb3React } from '@web3-react/core';
//contract
import stokeNFTArtifacts from '../../../artifacts/contracts/StokeNFT.sol/StokeNFT.json';
import marketPlaceArtifacts from '../../../artifacts/contracts/StokeMarketPlace.sol/StokeMarketplace.json';
import tokenArtifacts from '../../../artifacts/contracts/WETH.sol/WETH9.json';

const etherChain = process.env.ETHER_CHAIN;
const polygonChain = process.env.POLYGON_CHAIN;
const eth_tokenAddr = process.env.ETH_TOKEN;
const eth_stokeMarketAddr = process.env.ETH_MARKET;
const eth_nftAddr = process.env.ETH_NFT;
const pol_tokenAddr = process.env.POL_TOKEN;
const pol_stokeMarketAddr = process.env.POL_MARKET;
const pol_nftAddr = process.env.POL_NFT;

let tokenContract;
let nftContract;
let marketContract;
let tokenAddr;
let stokeMarketAddr;
let nftAddr;

export const AcceptOfferModal = ({
  isOpened,
  handleClose,
  price,
  name,
  collection,
  tokenFileName,
  id,
  tokenNetwork,
}) => {
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const [tokenFileLink, setTokenFileLink] = useState('/');
  const [isFileLoading, setIsFileLoading] = useState(true);
  const [typeOfTokenFile, setTypeOfTokenFile] = useState();
  const [videoSizes, setVideoSizes] = useState();
  const [usdPrice, setUsdPrice] = useState(0);
  const [usdFinalPrice, setUsdFinalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const offersData = useSelector((state) => state.offers.offers);

  const { stokeFee, creatorRoyalty } = useSelector((state) => state.administration.fees);
  const { account, library, chainId } = useWeb3React();

  const videoRef = useRef();
  const audioRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setFinalPrice(price + price * 0.1 + price * 0.0025);

    getEtherPrice().then((result) => {
      setUsdPrice((result * price).toFixed(2));
      setUsdFinalPrice((result * (price + price * 0.1 + price * 0.0025)).toFixed(2));
    });
  }, [price]);

  useEffect(() => {
    let supportNetwork;
    console.log(tokenNetwork);
    if (tokenNetwork === 'ethereum') {
      tokenAddr = eth_tokenAddr;
      stokeMarketAddr = eth_stokeMarketAddr;
      nftAddr = eth_nftAddr;
      supportNetwork = etherChain;
    } else if (tokenNetwork === 'polygon') {
      tokenAddr = pol_tokenAddr;
      stokeMarketAddr = pol_stokeMarketAddr;
      nftAddr = pol_nftAddr;
      supportNetwork = polygonChain;
    }

    if (chainId !== supportNetwork) {
      // TODO: add switch network modal
      (async () => {
        await switchNetwork(supportNetwork, library);
        dispatch(
          openSuccess({
            title: 'The network has been changed successfully.',
          })
        );
      })();
    }
  }, [isOpened]);

  useEffect(() => {
    if (tokenFileName) {
      const end = tokenFileName.substring(tokenFileName.indexOf('.') + 1).toLowerCase();
      if (images?.includes(end)) {
        setTypeOfTokenFile('image');
      } else if (videos?.includes(end)) {
        setTypeOfTokenFile('video');
        setTokenFileLink(`${process.env.BACKEND_ASSETS_URL}/nftMedia/${tokenFileName}`);
      } else if (audios?.includes(end)) {
        setIsFileLoading(false);
        setTypeOfTokenFile('audio');
      }
    }
  }, [tokenFileName]);

  useEffect(() => {
    if (typeOfTokenFile === 'video' && videoRef.current?.src) {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;
      const ratio = width / height;
      setVideoSizes({
        width: '70px',
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
    dispatch(openError('404 Token image is not found'));
  };

  const handleLoadImage = (width, height) => {
    setImageRatio(width / height);
  };

  //get contract
  useEffect(() => {
    if (library) {
      let supportNetwork;
      console.log(tokenNetwork);
      if (tokenNetwork === 'ethereum') {
        tokenAddr = eth_tokenAddr;
        stokeMarketAddr = eth_stokeMarketAddr;
        nftAddr = eth_nftAddr;
        supportNetwork = etherChain;
      } else if (tokenNetwork === 'polygon') {
        tokenAddr = pol_tokenAddr;
        stokeMarketAddr = pol_stokeMarketAddr;
        nftAddr = pol_nftAddr;
        supportNetwork = polygonChain;
      }

      const IToken = new ethers.ContractFactory(
        tokenArtifacts.abi,
        tokenArtifacts.deployedBytecode,
        library?.getSigner()
      );

      console.log('---tokenAddr', tokenAddr);
      if (tokenAddr) {
        tokenContract = IToken?.attach(tokenAddr);

        const IMarket = new ethers.ContractFactory(
          marketPlaceArtifacts.abi,
          marketPlaceArtifacts.deployedBytecode,
          library?.getSigner()
        );
        marketContract = IMarket?.attach(stokeMarketAddr);

        const IStokeNFT = new ethers.ContractFactory(
          stokeNFTArtifacts.abi,
          stokeNFTArtifacts.deployedBytecode,
          library?.getSigner()
        );
        nftContract = IStokeNFT.attach(nftAddr);
      }
    }
  }, [account, library, tokenNetwork]);

  const handleAccept = async () => {
    let supportNetwork;
    console.log(tokenNetwork);
    if (tokenNetwork === 'ethereum') {
      tokenAddr = eth_tokenAddr;
      stokeMarketAddr = eth_stokeMarketAddr;
      nftAddr = eth_nftAddr;
      supportNetwork = etherChain;
    } else if (tokenNetwork === 'polygon') {
      tokenAddr = pol_tokenAddr;
      stokeMarketAddr = pol_stokeMarketAddr;
      nftAddr = pol_nftAddr;
      supportNetwork = polygonChain;
    }

    if (chainId !== supportNetwork) {
      // TODO: add switch network modal
      // (async () => {
      await switchNetwork(supportNetwork, library);
      dispatch(
        openSuccess({
          title: 'The network has been changed successfully.',
        })
      );
      // })()
    } else {
      const offer = offersData.find((offer) => offer.id == id);
      console.log("???? ~ file: AcceptOfferModal.jsx ~ line 233 ~ handleAccept ~ offer", offer)
      // const sender = offer.seller.publicAddress;
      const wei = await tokenContract?.balanceOf(account);
      const balance = ethers.utils.formatUnits(wei);
      if (Number(balance) >= price) {
        const offerC = {
          account,
          amount: ethers.utils.parseEther(String(price)),
          expiresAt: Math.floor(offer.expirationDateParsed / 1000),
        };
        console.log("???? ~ file: AcceptOfferModal.jsx ~ line 239 ~ handleAccept ~ offerC", offerC)
        const tokenId = router.query.tokenId;
        const Token = {
          tokenId: Number(tokenId),
          tokenURI: `${process.env.BACKEND_URL}/nfts/metadata/${tokenId}`,
        };
        const signData = ethers.utils.splitSignature(offer.blockchainHash);
        const { v, r, s } = signData;
        // await tokenContract.permit(
        //   offerC.account,
        //   tokenAddr,
        //   offerC.amount,
        //   offerC.expiresAt,
        //   v,
        //   r,
        //   s
        // );
        await marketContract.accept(offerC, tokenAddr, nftAddr, Token);
      } else {
        dispatch(openError("Offer's owner has not enough balance"));
      }
    }
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
                <Image src="/create-nft/Icon-Close.svg" alt="close-icon" width={15} height={15} onClick={handleClose} />
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
                      (typeOfTokenFile === 'video' && videoRef.current && videoSizes.height) ||
                      (typeOfTokenFile === 'audio' && '70px'),
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
                  {typeOfTokenFile === 'image' && (
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
                  {typeOfTokenFile === 'video' && (
                    <video src={tokenFileLink} alt="token-video" ref={videoRef} className={cssStyles.video} />
                  )}
                  {typeOfTokenFile === 'audio' && (
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
                  <span>${usdPrice}</span>
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
                  <span className={cssStyles.marginLeft4}>{finalPrice}</span>
                </div>
                <div className={cssStyles.greySmallText}>
                  <span>${usdFinalPrice}</span>
                </div>
              </div>
            </div>
            <footer className={cssStyles.footer}>
              <CustButton color="primary" style={{ width: 'fit-content' }} text="Accept Offer" onClick={handleAccept} />
            </footer>
          </>
        ) : (
          <div className={cssStyles.chooseBoxWrapper}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={jsStyles.header}>
              <span>Please connect wallet</span>
              <div className={cssStyles.cross} onClick={handleClose}>
                <Image src="/create-nft/Icon-Close.svg" alt="close-icon" width={15} height={15} onClick={handleClose} />
              </div>
            </Typography>
            <ChooseWalletBox />
          </div>
        )}
      </Box>
    </Modal>
  );
};
