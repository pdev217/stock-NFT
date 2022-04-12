//components
import { CustButton } from "../../../../components/CustButton/CustButton";
//styles
import styles from "../../Settings.module.css";

export const PaymentsSubPage = () => {
  return (
    <div className={styles.paymentsWrapper}>
      <div className={styles.paymentsTitleInfoWrapper}>
        <div className={styles.title}>
          <span>Payment Settings</span>
        </div>
        <div className={styles.titleDescription}>
          Complete the verification steps below to accept card payments for your listings, using Moonpay.
          <br />
          <br />
          Moonpay is required to collect certain information to use their services. This information is not
          stored by Stoke.
        </div>
      </div>
      <div className={styles.patmentsVerificationsWrapper}>
        <div className={styles.paymentsVerification}>
          <div className={styles.verificationTitle}>
            <span>Basic Verification</span>
          </div>
          <div className={styles.verificationDescription}>
            Buy or sell up to $7.500 worth of NFT’s through card payments with MoonPay
          </div>
          {["Name", "Date of Birth", "Residence"].map((elem, i) => (
            <div key={i} className={styles.verificationList}>
              <div className={styles.dot} />
              <span>{elem}</span>
            </div>
          ))}
          <CustButton text="Begin" color="primary" className={styles.verificationButton} />
        </div>
        <div className={styles.paymentsVerification}>
          <div className={styles.verificationTitle}>
            <span>Advanced Verification</span>
          </div>
          <div className={styles.verificationDescription}>
          Buy or sell NFT’s with no lifetime limits
          </div>
          {["Advanced customer verification", "ID verification"].map((elem, i) => (
            <div key={i} className={styles.verificationList}>
              <div className={styles.dot} />
              <span>{elem}</span>
            </div>
          ))}
          <CustButton text="Begin" color="primary" className={styles.verificationButton} />
        </div>
      </div>
    </div>
  );
};
