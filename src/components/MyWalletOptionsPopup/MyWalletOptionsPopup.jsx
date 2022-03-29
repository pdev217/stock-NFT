import { useRef } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import Image from "next/image";
import { close } from "../../redux/slices/myWalletOptionsPopupSlice";
import { open as openLogout } from "../../redux/slices/logoutModalSlice";
import { logout } from "../../redux/slices/authorizationSlice";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import styles from "./MyWalletOptionsPopup.module.css";

export const MyWalletOptionsPopup = ({ className, walletName, src }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const closePopup = () => {
    dispatch(close());
  };

  const handleLogout = () => {
    dispatch(openLogout());
  };

  useOnClickOutside(ref, closePopup);

  return (
    <div className={cn(className, styles.wrapper)} ref={ref}>
      <div className={styles.option}>
        <Image src={src} height={19} width={19} alt={walletName} />
        <div className={styles.text}>{walletName}</div>
      </div>
      <div className={styles.option}>
        <Image src="/signout-icon.svg" height={19} width={19} alt="signout-icon" />
        <div className={styles.text} onClick={handleLogout}>
          Log Out
        </div>
      </div>
      <div className={styles.option}>
        <Image src="/signout-icon.svg" height={19} width={19} alt="refresh-funds-icon" />
        <div className={styles.text}>Refresh Funds</div>
      </div>
    </div>
  );
};
