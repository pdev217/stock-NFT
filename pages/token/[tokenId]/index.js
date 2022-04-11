import { ViewIndividualTokenPage } from "../../../src/page-components/ViewIndividualTokenPage/ViewIndividualTokenPage";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import https from "https";
import axios from "axios";
import { withLayout } from "../../../layout/Layout";

const ViewIndividualToken = ({ username, blockchainName, collectionName, name, fileName, externalLink, description, properties, levels, stats }) => (
  <ViewIndividualTokenPage
    blockchainName={blockchainName}
    collectionName={collectionName}
    description={description}
    externalLink={externalLink}
    fileName={fileName}
    levels={levels}
    name={name}
    properties={properties}
    stats={stats}
    username={username}
  />
);

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

  const {
    user,
    collection,
    blockchainType,
    name,
    fileName,
    externalLink,
    description,
    properties,
    levels,
    stats,
  } = data;
  return {
    props: {
      username: user?.username || null,
      name: name,
      collectionName: collection?.name || null,
      blockchainName: blockchainType?.name || null,
      fileName,
      externalLink,
      description,
      properties,
      levels,
      stats,
    },
  };
};
