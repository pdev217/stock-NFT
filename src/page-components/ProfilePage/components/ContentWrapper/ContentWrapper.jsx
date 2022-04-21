import { useState } from "react";
//classnames
import cn from "classnames";
//components
import { Sidebar } from "../Sidebar/Sidebar";
import { NormalFilterSection } from "./components/NormalFilterSection/NormalFilterSection";
//utils
import { chooseSections } from "./ContentWrapper.utils";
//styles
import styles from "./ContentWrapper.module.scss";
import { OffersFilterSection } from "./components/OffersFilterSection/OffersFilterSection";

export const ContentWrapper = () => {
  const [choosenSection, setChoosenSection] = useState("Created");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon }) => (
          <div
            className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: choosenSection === text,
            })}
            onClick={() => setChoosenSection(text)}
            key={text}
          >
            {icon}
            <span>{text}</span>
          </div>
        ))}
      </div>
      {chooseSections.map(({ text }) => (
        <>
          {choosenSection === text && (
            <div key={text} className={styles.bottomSideWrapper}>
              <Sidebar
                choosenTopSection={choosenSection}
                handleToggleSidebar={() => setIsSidebarOpened(!isSidebarOpened)}
                isOpened={isSidebarOpened}
              />
              <div className={styles.rightBottomSide}>
                {choosenSection !== "Activity" && choosenSection !== "Offers" && (
                    <NormalFilterSection />
                )}
                {choosenSection === "Offers" && (
                    <OffersFilterSection />
                )}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
