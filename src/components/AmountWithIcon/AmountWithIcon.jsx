import cn from "classnames";
import styles from "./AmountWithIcon.module.css";

export const AmountWithIcon = ({ amount, color, size, className }) => {
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }  

  return (
    <span
      className={cn(styles.span, className, {
        [styles.l]: size === "l",
        [styles.m]: size === "m",
        [styles.sm]: size === "sm",
        [styles.primary]: color === "primary",
        [styles.red]: color === "red",
        [styles.yellow]: color === "yellow",
      })}
    >
      IC ${numberWithCommas(amount)}
    </span>
  );
};
