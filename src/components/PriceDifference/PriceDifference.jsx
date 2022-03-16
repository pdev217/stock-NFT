import styles from "./PriceDifference.module.css";
import cn from "classnames";

export const PriceDifference = ({ direction, percent, className }) => {
  console.log('---className', className)
  switch (direction) {
    case "up":
      return (
        <span
          className={cn(styles.span, className, styles.up)}
        >{`> ${percent}%`}</span>
      );
    case "down":
      return (
        <span
          className={cn(styles.span, className, styles.down)}
        >{`< ${percent}%`}</span>
      );
    default:
      return (
        <span
          className={cn(styles.span, className, styles.noDifference)}
        >{`${percent}%`}</span>
      );
  }
};
