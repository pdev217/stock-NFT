import { useState } from "react";
//next
import Image from "next/image";
import Link from "next/link";
//classnames
import cn from "classnames";
//components
import { SmallProperty } from "./SmallProperty";
//styles
import styles from "./LeftSideInfoWrapper.module.css";

export const LeftSideInfoWrapper = ({ owner, description, properties }) => {
  const [isPropertiesOpened, setIsPropertiesOpened] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <Image src="/view-token/Icon:Description.svg" height={19} width={19} alt="description" />
        <span>Description</span>
      </div>
      <div className={styles.section}>
        <div className={styles.ownedBy}>
          Owned by{" "}
          <Link href="" passHref>
            <span className={styles.link}>{owner}</span>
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
        {properties.map(({ type, value, id, percent }) => (
          <SmallProperty type={type} key={id} value={value} percent={percent} />
        ))}
      </div>
    </div>
  );
};
