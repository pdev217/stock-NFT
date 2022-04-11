import styles from "./LeftSideInfoWrapper.module.css";

export const SmallProperty = ({ type, name, frequency }) => (
  <div className={styles.propertyWrapper}>
    <div className={styles.propertyType}>
      <span>{type}</span>
    </div>
    <div className={styles.propertyValue}>
      <span>{name}</span>
    </div>
    <div className={styles.propertyPercent}>
      <span>{frequency * 100}% have this trait</span>
    </div>
  </div>
);
