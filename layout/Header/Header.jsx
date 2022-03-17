import styles from "./Header.module.css";
import { routingCategories } from "./Header.utils";
import Image from "next/image";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        <Image src="/header-logo.png" height={106} width={267} alt="logo" />
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationCategories}>
          {routingCategories.map(({ categoryName, id, src }) => (
            <div className={styles.category} key={id}>
              <Image src={src} height={18} width={16} alt="logo" />
              <p className={styles.categoryName}>{categoryName}</p>
            </div>
          ))}
        </div>
        <div className={styles.searchButton}></div>
      </div>
      <div className={styles.personalInfo}></div>
    </header>
  );
};
