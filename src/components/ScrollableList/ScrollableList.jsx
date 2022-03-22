import cn from "classnames";
import styles from "./ScrollableList.module.css";

export const ScrollableList = ({ NFTs, className, Component }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      {NFTs.map(({ id, ...props }) => (
        <Component key={id} className={styles.card} {...props} />
      ))}
    </div>
  );
};
