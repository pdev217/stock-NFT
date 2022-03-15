import styles from "./Header.module.css";
import { routingCategories } from "./Header.utils";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.icon}>ICON</div>
      <div className={styles.routing}>
        <div className={styles.routingCategories}>
          {routingCategories.map(({ categoryName, id }) => (
            <p key={id} className={styles.routingCategory}>
                <span className={styles.catIcon}>IC</span>{categoryName}
            </p>
          ))}
        </div>
        <div className={styles.searching}>SEARCH BUTTON</div>
      </div>
      <div className={styles.userWorth}>
        <div className={styles.userInfo}>AVATAR</div>
        <div className={styles.userAssetsInfo}>CHART</div>
      </div>
    </header>
  );
};
