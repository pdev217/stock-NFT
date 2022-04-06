import { useEffect } from "react";
//classnames
import cn from "classnames";
//next
import Image from "next/image";
//redux
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../redux/slices/successSnackbarSlice";
//styles
import styles from "./SuccessSnackbar.module.css";

export const SuccessSnackbar = ({ className }) => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.successSnackbar.text);

  const closeSnackbar = () => {
    dispatch(close());
  };

  useEffect(() => {
    setTimeout(() => closeSnackbar(), 5000);
  }, []);

  return (
    <div className={cn(styles.wrapper, className)}>
      <div onClick={closeSnackbar} className={styles.icon}>
        <Image src="/Icon-Check.svg" height={19} width={19} alt="x-icon" />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
