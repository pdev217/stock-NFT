import styles from "./PriceWithIcon.module.css";
import cn from "classnames";

export const PriceWithIcon = ({ price, color, size }) => {
  return (
    <span
      className={cn(styles.span, {
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
