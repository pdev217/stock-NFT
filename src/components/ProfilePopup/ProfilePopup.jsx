import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../../redux/slices/authorizationSlice";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { close } from "../../redux/slices/profilePopupSlice";
import styles from "./ProfilePopup.module.css";

export const ProfilePopup = ({ categories, className, isAuthorized }) => {
  const { deactivate } = useWeb3React();
  const dispatch = useDispatch();
  const ref = useRef();

  const handleLogout = () => {
    deactivate();
    dispatch(logout())
  }

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
          <Link href="#" passHref>
            <>
              <div className={styles.icon}>
                <Image
                  src="/signout-icon.svg"
                  alt="signout-icon"
                  layout="fill"
                />
              </div>
              <div className={styles.text}>Log Out</div>
            </>
          </Link>
        </div>
      )}
    </div>
  );
};
