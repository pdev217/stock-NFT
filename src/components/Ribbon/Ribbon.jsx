import styles from "./Ribbon.module.css";
import cn from "classnames";

export const Ribbon = ({ type }) => {
  switch (type) {
    case "u-rare":
      return <div className={cn(styles.ribbon, styles.uRare)}>IC u-rare</div>;
    case "uncmn":
      return <div className={cn(styles.ribbon, styles.uncmn)}>IC uncmn</div>;
    case "rare":
      return <div className={cn(styles.ribbon, styles.rare)}>IC rare</div>;
    case "common":
      return <div className={cn(styles.ribbon, styles.common)}>IC common</div>;
  }
};
