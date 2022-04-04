<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
=======
>>>>>>> 472e6f6e5fd30e016e37770be94344a938014b5d
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
<<<<<<< HEAD
//hooks
import useAuth from "../../hooks/useAuth";
=======
>>>>>>> 472e6f6e5fd30e016e37770be94344a938014b5d

export const MainPage = () => {
  const dispatch = useDispatch();
  
  const { error } = useAuth()
  if (error) {
    dispatch(openError(`${error.statusCode} ${error.message}`))
  }

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
