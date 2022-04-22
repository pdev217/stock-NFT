import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getAvailableSections } from "./TagsWrapper.utils";
import styles from "./TagsWrapper.module.scss";

export const TagsWrapper = ({ choosenSection }) => {
  const [displayedFilterSections, setDisplayedFilterSections] = useState(
    getAvailableSections(choosenSection)
  );

  const dispatch = useDispatch();
  const { selectedStatuses } = useSelector((state) => state.profileFiltration);

  return <div className={styles.wrapper}></div>;
};
