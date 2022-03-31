import { useEffect } from "react";
//axios
import axios from "axios";
//next
import { useRouter } from "next/router";
//redux
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
//page-sections
import { Collections } from "./Collections/Collections";
import { HottestNFTCollectibles } from "./HottestNFTCollectibles/HottestNFTCollectibles";
import { TrendingNFTs } from "./TrendingNFTs/TrendingNFTs";
import { WeCanConnectWith } from "./WeCanConnectWith/WeCanConnectWith";
import { SpecialAuctionNFTs } from "./SpecialAuctionNFTs/SpecialAuctionNFTs";
import { MostPopularNFTs } from "./MostPopulatNFTs/MostPopulatNFTs";
import { AssetBackedNFTs } from "./AssetBackedNFTs/AssetBackedNFTs";
import { MakeYourOwnCollection } from "./MakeYourOwnCollection/MakeYourOwnCollection";
import { VideoAboutNFT } from "./VideoAboutNFT/VideoAboutNFT";
import { TopCollections } from "./TopCollections/TopCollections";
import { JoinOurCreatoes } from "./JoinOurCreators/JoinOurCreatoes";
import { PopularCreators } from "./PopularCreators/PopularCreators";
import useAuth from "../../hooks/useAuth";

export const MainPage = () => {
  return (
    <>
      <HottestNFTCollectibles />
      <TrendingNFTs />
      <WeCanConnectWith />
      <Collections />
      <SpecialAuctionNFTs />
      <MostPopularNFTs />
      <AssetBackedNFTs />
      <MakeYourOwnCollection />
      <VideoAboutNFT />
      <TopCollections />
      <JoinOurCreatoes />
      <PopularCreators />
    </>
  );
};
