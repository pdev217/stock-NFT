import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { logout, setAccount } from "../../redux/slices/authorizationSlice";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { close } from "../../redux/slices/profilePopupSlice";
import styles from "./ProfilePopup.module.css";
import { useRouter } from "next/router";

export const ProfilePopup = ({ categories, className }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const router = useRouter();
  const { deactivate } = useWeb3React();

  const isAuthorized = useSelector((state) => {
    return state.authorization.authorization.isAuthorized;
  });

  const handleLogout = () => {
    deactivate();
    dispatch(logout());
    dispatch(setAccount(null));
    router.push('/connect-wallet')
  };

  const closePopup = () => {
    dispatch(close());
  };

  useOnClickOutside(ref, closePopup);

  return (
    <div className={cn(className, styles.wrapper)} ref={ref}>
      {categories.map(({ categoryName, src, href, id }) => (
        <div key={id} className={styles.category}>
          <Link href={href} passHref>
            <>
              <div className={styles.icon}>
                <Image src={src} alt={categoryName} layout="fill" />
              </div>
              <div className={styles.text}>{categoryName}</div>
            </>
          </Link>
        </div>
      ))}
      {isAuthorized && (
        <div className={styles.category} onClick={handleLogout}>
          <div className={styles.icon}>
            <Image src="/signout-icon.svg" alt="signout-icon" layout="fill" />
          </div>
          <div className={styles.text}>Log Out</div>
        </div>
      )}
    </div>
  );
};
