import { useState } from "react";
//classnames
import cn from 'classnames';
//utils
import { chooseSections } from "./ContentWrapper.utils";
//styles
import styles from "./ContentWrapper.module.scss";

export const ContentWrapper = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chooseSectionWrapper}>
        {chooseSections.map(({ text, icon }) => (
          <div className={cn(styles.chooseSection, {
              [styles.chooseSectionActive]: true
          })} key={text}>
            {icon}
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
