import { useState, useEffect, useCallback } from "react";
//redux
import { useSelector } from "react-redux";
//axios
import axios from "axios";
//classnames
import cn from "classnames";
//components
import { Sidebar } from "../Sidebar/Sidebar";
import { NormalFilterSection } from "./components/NormalFilterSection/NormalFilterSection";
import { OffersFilterSection } from "./components/OffersFilterSection/OffersFilterSection";
import { TagsWrapper } from "./components/TagsWrapper/TagsWrapper";
import { SquareNFTCard } from "../../../../components/SquareNFTCard/SquareNFTCard";
//utils
import { chooseSections } from "./ContentWrapper.utils";
//styles
import styles from "./ContentWrapper.module.scss";

export const ContentWrapper = () => {
  const [choosenSection, setChoosenSection] = useState("created");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [tokens, setTokens] = useState([]);

  const { readyFilterOption } = useSelector((state) => state.profileFiltration);

  const getTokens = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const { sortOrder, sortBy } = readyFilterOption;

    const {
      data: { data },
    } = await axios.get(
      `${process.env.BACKEND_URL}/users/account/assets?tab=${choosenSection}&sortOrder=${sortOrder}&sortBy=${sortBy}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    return data;
  }, [choosenSection, readyFilterOption]);

  useEffect(() => {
    getTokens().then((result) => setTokens(result));
  }, [getTokens]);
  console.log("---tokens", tokens);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon, nameForBE }) => (
          <div
            className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: choosenSection === nameForBE,
            })}
            onClick={() => setChoosenSection(nameForBE)}
            key={text}
          >
            {icon}
            <span>{text}</span>
          </div>
        ))}
      </div>
      {chooseSections.map(({ nameForBE }) => (
        <>
          {choosenSection === nameForBE && (
            <div key={nameForBE} className={styles.bottomSideWrapper}>
              <Sidebar
                choosenTopSection={choosenSection}
                handleToggleSidebar={() => setIsSidebarOpened(!isSidebarOpened)}
                isOpened={isSidebarOpened}
              />
              <div className={styles.rightBottomSide}>
                {choosenSection !== "Activity" && choosenSection !== "Offers" && <NormalFilterSection />}
                {choosenSection === "Offers" && <OffersFilterSection />}
                <TagsWrapper choosenSection={choosenSection} />
                {tokens.map(({ name, category, status, price, username, fileName, id }) => (
                  <SquareNFTCard
                    key={id}
                    name={name}
                    category={category}
                    status={status}
                    price={price}
                    username={username}
                    fileName={fileName}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
