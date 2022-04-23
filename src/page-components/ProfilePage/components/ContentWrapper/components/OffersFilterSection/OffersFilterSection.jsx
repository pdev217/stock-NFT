//redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../../../redux/slices/profileFiltrationSlice";
//components
import { CustSwitch } from "../../../../../../components/CustSwitch/CustSwitch";
//styles
import styles from "./OffersFilterSection.module.scss";

export const OffersFilterSection = () => {
  const dispatch = useDispatch();
  const { isShownAllOffers } = useSelector((state) => state.profileFiltration);

  return (
    <div className={styles.wrapper}>
      <div className={styles.switch}>
        <span>Show all offers</span>
        <CustSwitch
          checked={isShownAllOffers}
          onChange={({ target: { checked } }) =>
            dispatch(setData({ field: "isShownAllOffers", data: checked }))
          }
        />
      </div>
      <div className={styles.settingsButton} />
    </div>
  );
};
