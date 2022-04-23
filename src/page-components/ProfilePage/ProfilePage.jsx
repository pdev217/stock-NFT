//components
import { ContentWrapper } from "./components/ContentWrapper/ContentWrapper";
import { ProfileDataWrapper } from "./components/ProfileDataWrapper/ProfileDataWrapper";
//styles
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  return <div>
      <ProfileDataWrapper />
      <ContentWrapper />
  </div>;
};
