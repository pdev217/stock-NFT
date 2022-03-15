import styles from "./PriceDifference.module.css";
import cn from 'classnames';

export const PriceDifference = ({ direction, percent }) => {
  switch (direction) {
    case "up":
      return <span className={cn(styles.span, styles.up)}>{`> ${percent}%`}</span>;
    case "down":
      return <span className={cn(styles.span, styles.down)}>{`< ${percent}%`}</span>;
    default:
      return <span className={cn(styles.span, styles.noDifference)}>{`${percent}%`}</span>;
  }
};
