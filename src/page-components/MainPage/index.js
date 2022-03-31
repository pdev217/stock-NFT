import { useEffect } from "react";
//axios
import axios from "axios";
//next
import { useRouter } from "next/router";
//redux
import { useDispatch } from "react-redux";
import { logout, setAccount } from "../../redux/slices/authorizationSlice";
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

export const MainPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const verifyUser = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('accessToken', accessToken)
      await axios
        .get(`${process.env.BACKEND_URL}/auth/verifyUser`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        })
        .then((result) => {
          console.log('result', result)
          localStorage.setItem("accessToken", result.data.token);
        });
    } catch (e) {
      dispatch(logout());
      dispatch(setAccount(null));
      router.push("/connect-wallet");
      dispatch(openError(`${e.response.data.statusCode} ${e.response.data.message}`));
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

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
