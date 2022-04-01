import styles from "./Stat.module.css";

export const Stat = ({ name, value, maxValue }) => (
  <div className={styles.wrapper}>
    <span>{name}</span>
    <span>
      {value} of {maxValue}
    </span>
  </div>
);
