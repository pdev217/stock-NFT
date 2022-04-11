import styles from "./LeftSideInfoWrapper.module.css";

export const SmallProperty = ({ type, value, percent }) => (
  <div className={styles.propertyWrapper}>
    <div className={styles.propertyType}>
      <span>{type}</span>
    </div>
    <div className={styles.propertyValue}>
      <span>{value}</span>
    </div>
    <div className={styles.propertyPercent}>
      <span>{percent}% have this trait</span>
    </div>
  </div>
);
