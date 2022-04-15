import { ViewIndividualTokenPage } from "../../../src/page-components/ViewIndividualTokenPage/ViewIndividualTokenPage";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import https from "https";
import axios from "axios";
import { withLayout } from "../../../layout/Layout";

const ViewIndividualToken = (props) => <ViewIndividualTokenPage {...props} />;

export default withLayout(ViewIndividualToken);

export const getServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const { data } = await axios.get(`${process.env.BACKEND_URL}/nfts/${params.tokenId}`, {
    httpsAgent,
  });

  return {
    props: {
      username: data.user?.username || null,
      userId: data.user?.id || null,
      collectionName: data.collection?.name || null,
      about: data.collection.description,
      blockchainName: data.blockchainType?.name || null,
      ...data,
    },
  };
};
