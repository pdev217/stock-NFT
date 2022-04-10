import { useState, useEffect } from "react";
import styles from "./RightSideInfoWrapper.module.css";

export const LeftTimeContainer = ({ endTime }) => {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const getLeftTime = () => {
    const nowDate = new Date();
    const endDate = new Date(endTime);
    const result = endDate - nowDate + 1000;

    const newSeconds = Math.floor((result / 1000) % 60);
    const newMinutes = Math.floor((result / 1000 / 60) % 60);
    const newHours = Math.floor((result / 1000 / 60 / 60) % 24);
    const newDays = Math.floor(result / 1000 / 60 / 60 / 24);

    if (newSeconds < 10) newSeconds = `0${newSeconds}`;
    if (newMinutes < 10) newMinutes = `0${newMinutes}`;
    if (newHours < 10) newHours = `0${newHours}`;

    setSeconds(newSeconds);

    if (minutes === "") {
      setMinutes(newMinutes);
      setHours(newHours);
      setDays(newDays);
    }

    if (newMinutes !== minutes) {
      setMinutes(newMinutes);
      if (newHours !== hours) {
        setHours(newHours);
        if (newDays !== days) {
          setDays(newDays);
        }
      }
    }
  };

  useEffect(() => {
    endTime && setInterval(getLeftTime, 1000);
  }, [endTime]);

  return (
    <div className={styles.timeLeftToEnd}>
      <div className={styles.timeLeft}>
        <span>{days}</span>
      </div>
      <div className={styles.timeLeft}>
        <span>{hours}</span>
      </div>
      <div className={styles.timeLeft}>
        <span>{minutes}</span>
      </div>
      <div className={styles.timeLeft}>
        <span>{seconds}</span>
      </div>
      <div className={styles.greySmallText}>
        <span>Days</span>
      </div>
      <div className={styles.greySmallText}>
        <span>Hours</span>
      </div>
      <div className={styles.greySmallText}>
        <span>Minutes</span>
      </div>
      <div className={styles.greySmallText}>
        <span>Seconds</span>
      </div>
    </div>
  );
};
