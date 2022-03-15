import styles from './Tag.module.css';

export const Tag = ({text}) => (
  <div className={styles.tag}>
    <p>{text}</p>
  </div>
);
