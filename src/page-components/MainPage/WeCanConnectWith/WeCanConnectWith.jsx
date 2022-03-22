import Image from "next/image";
import { wallets } from "./WeCanConnectWith.utils";
import styles from "./WeCanConnectWith.module.css";

export const WeCanConnectWith = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>WeCanConnectWith</div>
      <div className={styles.wallets}>
        {wallets.map(({ name, src, id, height, width }) => (
          <div key={id} className={styles.wallet}>
            <Image src={src} alt={name} height={height} width={width} />
            <p className={styles.walletName}>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
