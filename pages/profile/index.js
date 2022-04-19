import { ProfilePage } from "../../src/page-components/ProfilePage/ProfilePage";
import { withHeader } from "../../layout/Layout";

const Profile = () => <ProfilePage />;

export default withHeader(Profile);