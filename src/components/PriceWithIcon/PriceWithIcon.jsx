import styles from "./PriceWithIcon.module.css";
import cn from "classnames";

export const PriceWithIcon = ({ price, color, size, className }) => {
  console.log('---className', className)
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
      IC ${price}
    </span>
  );
};
