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
    </>
  );
};