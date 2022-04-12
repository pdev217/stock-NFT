import { useState } from "react";
//classnames
import cn from "classnames";
//utils
import { sidebarData } from "./Settings.utils";
//components
import { ProfileSubPage } from "./components/subPages/ProfileSubPage";
import { NoticicationsSubPage } from "./components/subPages/NoticicationsSubPage";
import { PaymentsSubPage } from "./components/subPages/PaymentsSubPage";
//icons
import ProfileIcon from "./icons/profile.svg";
import NotificationsIcon from "./icons/notifications.svg";
import PaymentsIcon from './icons/payments.svg'
//hooks
import useAuth from "../../hooks/useAuth";
//styles
import styles from "./Settings.module.css";

export const Settings = () => {
  const { error } = useAuth();
  const [activeSidebarRow, setActiveSidebarRow] = useState("Profile");

  const getIcon = (text) => {
    switch (text) {
      case "Profile":
        return <ProfileIcon />;
      case "Notifications":
        return <NotificationsIcon />;
      case "Payments":
        return <PaymentsIcon />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        {sidebarData.map(({ text, id, hasIcon, noClickable }) => (
          <div
            className={cn(styles.sidebarRow, {
              [styles.sidebarActiveRow]: activeSidebarRow === text,
            })}
            key={id}
            onClick={() => !noClickable && setActiveSidebarRow(text)}
          >
            {hasIcon && (
              <div
                className={cn(styles.sidebarIconWrapper, {
                  [styles.sidebarActiveRow]: activeSidebarRow === text,
                })}
              >
                {getIcon(text)}
              </div>
            )}
            <div className={styles.sidebarText}>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pusherRight} />
      <div className={styles.contentWrapper}>
        {activeSidebarRow === "Profile" && <ProfileSubPage />}
        {activeSidebarRow === "Notifications" && <NoticicationsSubPage />}
        {activeSidebarRow === "Payments" && <PaymentsSubPage />}
      </div>
    </div>
  );
};
