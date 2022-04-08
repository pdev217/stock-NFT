import { useState } from "react";
//next
import Image from "next/image";
import Link from "next/link";
//styles
import styles from "./LeftSideInfoWrapper.module.css";

export const LeftSideInfoWrapper = ({ owner, description }) => {
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
        <span>Properties</span>
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
    </div>
  );
};
