import Image from "next/image";
import styles from "./Footer.module.css";
import { categories } from "./Footer.utils";
import { icons } from "./Footer.utils";
import Link from "next/link";
import { CustButton } from "../../src/components/CustButton/CustButton";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.image}>
        <Image src="/footer-logo.png" alt="stoke-logo" layout="fill" />
      </div>
      <div className={styles.contentWrapper}>
        <p className={styles.aboutStoke}>
          About Stoke ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et
        </p>
        <div className={styles.categoriesAndWalletIconsWrapper}>
          <div className={styles.categories}>
            {categories.map((category) => (
              <div key={category.id} className={styles.category}>
                <Link href={category.href}>{category.name}</Link>
              </div>
            ))}
          </div>
          <div className={styles.icons}>
            {icons.map((icon) => (
              <div key={icon.id} className={styles.walletIcon}>
                <Image src={icon.src} alt={icon.alt} layout="fill" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.getAlertsAndSignUpWrapper}>
          <div className={styles.getAlerts}>
            <div className={styles.alertIcon}>
              <Image
                src="/add-alert-icon.svg"
                alt="add-alert-icon"
                layout="fill"
              />
            </div>
            <p className={styles.getAlertsText}>Get New Drop Alerts</p>
          </div>
          <CustButton color="primary" text="Sign Up" />
        </div>
      </div>
    </footer>
  );
};
