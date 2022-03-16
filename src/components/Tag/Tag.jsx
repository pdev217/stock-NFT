import styles from './Tag.module.css';
import cn from "classnames";

export const Tag = ({text, className}) => (
  <div className={cn(styles.tag, className)}>
    <p>{text}</p>
  </div>
);
