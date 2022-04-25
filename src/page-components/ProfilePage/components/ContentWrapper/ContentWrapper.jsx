import { useState, useEffect, useCallback } from "react";
//next
import Image from "next/image";
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
  const [choosenSection, setChoosenSection] = useState("collected");
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [tokens, setTokens] = useState([]);

  const { readyFilterOption, tokensGridScale } = useSelector((state) => state.profileFiltration);

  const getTokens = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const { sortOrder, sortBy } = readyFilterOption;

    console.log('---readyFilterOption', readyFilterOption)
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
  console.log('---tokensGridScale', tokensGridScale)

  useEffect(() => {
    getTokens().then((result) => setTokens(result));
  }, [getTokens]);

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
                {tokens && tokens.length > 0 && (
                  <div
                    className={cn(styles.tokensGrid, {
                      [styles.tokensGridSmall]: tokensGridScale === "small",
                      [styles.tokensGridLarge]: tokensGridScale === "large",
                    })}
                  >
                    {tokens.map(({ name, category, status, price, owner, fileName, id }) => (
                      <SquareNFTCard
                        key={id}
                        name={name}
                        category={category}
                        status={status}
                        price={price}
                        owner={owner}
                        fileName={fileName}
                      />
                    ))}
                  </div>
                )}
                {!tokens ||
                  (tokens.length === 0 && (
                    <div className={styles.emptyTokens}>
                      <Image src="/profile/Icon-Empty.svg" height={156} width={160} alt="no-items" />
                      <span>No Items to display</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
