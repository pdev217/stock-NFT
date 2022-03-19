import { useRef } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { close } from "../../redux/slices/profilePopupSlice";
import styles from "./ProfilePopup.module.css";

export const ProfilePopup = ({ categories, className }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const closePopup = () => {
    dispatch(closePopup())
  }

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
    </div>
  );
};
