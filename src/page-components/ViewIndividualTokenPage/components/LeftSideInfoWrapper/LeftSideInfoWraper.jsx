import { useState } from "react";
//next
import Image from "next/image";
import Link from "next/link";
//classnames
import cn from "classnames";
//components
import { Stat } from "../../../../components/Stat/Stat";
import { Level } from "../../../../components/Level/Level";
import { SmallProperty } from "./SmallProperty";
//styles
import styles from "./LeftSideInfoWrapper.module.css";

export const LeftSideInfoWrapper = ({ owner, description, properties, stats, status, about, levels }) => {
  const [isPropertiesOpened, setIsPropertiesOpened] = useState(true);
  const [isDetailsOpened, setIsDetailsOpened] = useState(true);
  const [isLevelsOpened, setIsLevelsOpened] = useState(true);
  const [isStatsOpened, setIsStatsOpened] = useState(true);
  const [isAboutOpened, setIsAboutOpened] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:Description.svg" height={19} width={19} alt="description" />
        <span>Description</span>
      </div>
      <div className={styles.section}>
        <div className={styles.ownedBy}>
          Owned by{" "}
          <Link href="/" passHref>
            <span className={styles.link}>{owner || "Some owner"}</span>
          </Link>
        </div>
        <div>{description}</div>
      </div>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:Properties.svg" height={19} width={19} alt="description" />
        <div>
          <span>Properties</span>
          {isPropertiesOpened ? (
            <Image
              src="/view-token/Icon:ArrowUp.svg"
              height={15}
              width={30}
              alt="arrow-down"
              onClick={() => setIsPropertiesOpened(false)}
            />
          ) : (
            <Image
              src="/view-token/Icon:ArrowDown.svg"
              height={15}
              width={30}
              alt="arrow-up"
              onClick={() => setIsPropertiesOpened(true)}
            />
          )}
        </div>
      </div>
      <div
        className={cn(styles.section, styles.propertiesWrapper, {
          [styles.propertiesClosed]: !isPropertiesOpened,
        })}
      >
        {properties && properties.length > 0 ? (
          properties.map(({ type, name, id, frequency }) => (
            <SmallProperty type={type} key={id} name={name} frequency={frequency} />
          ))
        ) : (
          <div className={styles.emptySection}>
            <span>No properties</span>
          </div>
        )}
      </div>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:Properties.svg" height={19} width={19} alt="description" />
        <div>
          <span>Stats</span>
          {isStatsOpened ? (
            <Image
              src="/view-token/Icon:ArrowUp.svg"
              height={15}
              width={30}
              alt="arrow-down"
              onClick={() => setIsStatsOpened(false)}
            />
          ) : (
            <Image
              src="/view-token/Icon:ArrowDown.svg"
              height={15}
              width={30}
              alt="arrow-up"
              onClick={() => setIsStatsOpened(true)}
            />
          )}
        </div>
      </div>
      <div
        className={cn(styles.section, styles.propertiesWrapper, {
          [styles.propertiesClosed]: !isStatsOpened,
        })}
      >
        {stats && stats.length > 0 ? (
          stats.map(({ nftValue, name, id, maxValue }) => (
            <Stat nftValue={nftValue} key={id} name={name} maxValue={maxValue} className={styles.stat} />
          ))
        ) : (
          <div className={styles.emptySection}>
            <span>No stats</span>
          </div>
        )}
      </div>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:Properties.svg" height={19} width={19} alt="description" />
        <div>
          <span>Levels</span>
          {isLevelsOpened ? (
            <Image
              src="/view-token/Icon:ArrowUp.svg"
              height={15}
              width={30}
              alt="arrow-down"
              onClick={() => setIsLevelsOpened(false)}
            />
          ) : (
            <Image
              src="/view-token/Icon:ArrowDown.svg"
              height={15}
              width={30}
              alt="arrow-up"
              onClick={() => setIsLevelsOpened(true)}
            />
          )}
        </div>
      </div>
      <div
        className={cn(styles.section, styles.propertiesWrapper, {
          [styles.propertiesClosed]: !isLevelsOpened,
        })}
      >
        {levels && levels.length > 0 ? (
          levels.map(({ nftValue, name, id, maxValue }) => (
            <Level nftValue={nftValue} key={id} name={name} maxValue={maxValue} className={styles.stat} />
          ))
        ) : (
          <div className={styles.emptySection}>
            <span>No levels</span>
          </div>
        )}
      </div>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:About.svg" height={19} width={19} alt="description" />
        <div>
          <span>About</span>
          {isAboutOpened ? (
            <Image
              src="/view-token/Icon:ArrowUp.svg"
              height={15}
              width={30}
              alt="arrow-down"
              onClick={() => setIsAboutOpened(false)}
            />
          ) : (
            <Image
              src="/view-token/Icon:ArrowDown.svg"
              height={15}
              width={30}
              alt="arrow-up"
              onClick={() => setIsAboutOpened(true)}
            />
          )}
        </div>
      </div>
      <div
        className={cn(styles.section, styles.propertiesWrapper, {
          [styles.propertiesClosed]: !isAboutOpened,
        })}
      >
        {about ? (
          <div></div>
        ) : (
          <div className={styles.emptySection}>
            <span>No info</span>
          </div>
        )}
      </div>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:About.svg" height={19} width={19} alt="description" />
        <div>
          <span>Details</span>
          {isDetailsOpened ? (
            <Image
              src="/view-token/Icon:ArrowUp.svg"
              height={15}
              width={30}
              alt="arrow-down"
              onClick={() => setIsDetailsOpened(false)}
            />
          ) : (
            <Image
              src="/view-token/Icon:ArrowDown.svg"
              height={15}
              width={30}
              alt="arrow-up"
              onClick={() => setIsDetailsOpened(true)}
            />
          )}
        </div>
      </div>
      <div
        className={cn(styles.section, {
          [styles.propertiesClosed]: !isDetailsOpened,
        })}
      >
        {status === "pending" && (
          <div className={styles.emptySection}>
            <span>Lazy minting</span>
          </div>
        )}
      </div>
    </div>
  );
};
