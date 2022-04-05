import { useState } from "react";
//classnames
import cn from "classnames";
//next
import Image from "next/image";
//utils
import { sidebarData } from "./ProfileSettings.utils";
//components
import { ProfileSubPage } from "./components/ProfileSubPage";
//styles
import styles from "./ProfileSettings.module.css";

export const ProfileSettings = () => {
  const [activeSidebarRow, setActiveSidebarRow] = useState("Profile");

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        {sidebarData.map(({ text, id, src }) => (
          <div
            className={cn(styles.sidebarRow, {
              [styles.sidebarActiveRow]: activeSidebarRow === text,
            })}
            key={id}
            onClick={() => setActiveSidebarRow(text)}
          >
            {src && (
              <div className={styles.sidebarIconWrapper}>
                <Image src={src} alt={text} layout="fill" />
              </div>
            )}
            <div className={styles.sidebarText}>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.contentWrapper}>
        {activeSidebarRow === "Profile" && (
          <ProfileSubPage />
        )}
      </div>
    </div>
  );
};
