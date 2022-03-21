import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../redux/slices/errorSnackbarSlice";
import styles from "./ErrorSnackbar.module.css";

export const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.errorSnackbar.text);

  const closeSnackbar = () => {
    dispatch(close());
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={closeSnackbar}>
        <Image src="/x-icon.svg" height={19} width={19} alt="x-icon" />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
