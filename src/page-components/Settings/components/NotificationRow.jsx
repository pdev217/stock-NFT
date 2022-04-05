//components
import { CustSwitch } from "../../../components/CustSwitch/CustSwitch";
//styles
import styles from "../Settings.module.css";

export const NotificationRow = ({ handleChange, title, description, defaultChecked }) => {
  return (
    <div className={styles.underlinedSection}>
      <div className={styles.fieldsTitleDescriptionWrapper}>
        <div className={styles.notificationTitle}>
          <span>{title}</span>
        </div>
        <div className={styles.notificationDescription}>
          <span>{description}</span>
        </div>
      </div>
      <CustSwitch className={styles.switch} defaultChecked={defaultChecked} onChange={() => {}} />
    </div>
  );
};
