import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import cn from "classnames";
import Image from "next/image";
import { logout } from "../../redux/slices/authorizationSlice";
import { close } from "../../redux/slices/myWalletOptionsPopupSlice";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import styles from "./MyWalletOptionsPopup.module.css";

export const MyWalletOptionsPopup = ({ className, walletName, src }) => {
  const dispatch = useDispatch();
  const { deactivate } = useWeb3React();
  const ref = useRef();

  const handleLogout = () => {
    try {
      deactivate();
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };

  const closePopup = () => {
    dispatch(close());
  };

  useOnClickOutside(ref, closePopup);

  return (
    <div className={cn(className, styles.wrapper)} ref={ref}>
      <div className={styles.option}>
        <Image src={src} height={19} width={19} alt={walletName} />
        <div className={styles.text}>{walletName}</div>
      </div>
      <div className={styles.option} onClick={handleLogout}>
        <Image
          src="/signout-icon.svg"
          height={19}
          width={19}
          alt="signout-icon"
        />
        <div className={styles.text}>Log Out</div>
      </div>
      <div className={styles.option}>
        <Image
          src="/signout-icon.svg"
          height={19}
          width={19}
          alt="refresh-funds-icon"
        />
        <div className={styles.text}>Refresh Funds</div>
      </div>
    </div>
  );
};
