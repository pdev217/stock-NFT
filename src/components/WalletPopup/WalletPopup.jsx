import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { close } from "../../redux/slices/walletPopupSlice";
import { open } from "../../redux/slices/myWalletOptionsPopupSlice";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { ChooseWalletBox } from "../ChooseWalletBox/ChooseWalletBox";
import { MyWalletOptionsPopup } from "../MyWalletOptionsPopup/MyWalletOptionsPopup";
import styles from "./WalletPopup.module.css";
import useAuth from "../../hooks/useAuth";

export const WalletPopup = ({ className }) => {
  const isMyWalletOptionsPopupOpened = useSelector(
    (state) => state.myWalletOptionsPopup.myWalletOptionsPopup.isOpened
  );

  const { isAuthorized } = useAuth()

  const dispatch = useDispatch();
  const ref = useRef();

  const closePopup = () => {
    dispatch(close());
  };

  const openMyWalletOptionsPopup = () => {
    dispatch(open());
  };

  useOnClickOutside(ref, closePopup);

  return isAuthorized ? (
    <div ref={ref} className={cn(className, styles.wrapper)}>
      <div
        className={cn(styles.title, {
          [styles.authTitle]: isAuthorized,
        })}
        onClick={openMyWalletOptionsPopup}
      >
        <Image src="/some-man.png" height={39} width={39} alt="user-avatar" />
        <div className={styles.titleText}>My Wallet</div>
        <div className={styles.deltaIcon}>
          <Image src="/delta-down-icon.svg" layout="fill" alt="delta-down" />
        </div>
        {isMyWalletOptionsPopupOpened && (
          <MyWalletOptionsPopup
            className={styles.myWalletOptionsPopup}
            walletName="Metamask"
            src="/metamask-fox-wallet.svg"
          />
        )}
      </div>
      <div className={styles.authContentWrapper}>
        <div className={styles.userBalance}>
          <div className={styles.balanceTitle}>Total balance</div>
          {/* to make balance intication proper with any number. RegExp */}
          <div className={styles.balanceNumber}>$0,00 USD</div>
        </div>
        <Button
          sx={{
            height: "81px",
            width: "100%",
            textTransform: "none",
            background: "#617BFF 0% 0% no-repeat padding-box;",
            color: "var(--white)",
            boxShadow: "none",
            borderRadius: "0px 0px 16px 16px",
            fontSize: "22px",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: "33px",
            fontWeight: "800",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "rgb(82, 96, 227)",
            },
          }}
          variant="contained"
        >
          Add funds
        </Button>
      </div>
    </div>
  ) : (
    <div ref={ref} className={cn(className, styles.wrapper)}>
      <div className={styles.title}>
        <Image src="/wallet-icon.svg" height={24} width={24} alt="wallet-icon" />
        <div className={styles.titleText}>My Wallet</div>
      </div>
      <div className={styles.prompt}>
        Connect with one of our available{" "}
        <Link href="#" passHref>
          <span className={styles.walletLink}>wallet</span>
        </Link>{" "}
        providers or create a new one.
      </div>
      <ChooseWalletBox className={styles.chooseWalletBox} choosenWallet={-1} />
    </div>
  );
};
