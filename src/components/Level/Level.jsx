import styles from "./Level.module.css";

export const Level = ({ name, value, maxValue }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textInfo}>
        <span>{name}</span>
        <span>
          {value} of {maxValue}
        </span>
      </div>
      <div className={styles.slider}>
        <div className={styles.filled} style={{ width: `${(value / maxValue) * 100}%`}}/>
      </div>
    </div>
  );
};
