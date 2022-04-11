import { ViewIndividualTokenPage } from "../../../src/page-components/ViewIndividualTokenPage/ViewIndividualTokenPage";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from 'axios';
import { withLayout } from "../../../layout/Layout";

const ViewIndividualToken = () => <ViewIndividualTokenPage />;

export default withLayout(ViewIndividualToken);

export const getServerSideProps = async ({ params }) => {
    if (!params) {
        return {
            notFound: true,
        };
    }

    //const response = await axios.get(`${process.env.BACKEND_URL}/nfts/${params.tokenId}`);

    return {
        props: {}
    }
}