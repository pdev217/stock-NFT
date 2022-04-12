import cn from "classnames";
import styles from "./Stat.module.css";

export const Stat = ({ name, nftValue, maxValue, className }) => (
  <div className={cn(className, styles.wrapper)}>
    <span>{name}</span>
    <span>
      {nftValue} of {maxValue}
    </span>
  </div>
);
