import cn from "classnames";
import Image from "next/image";
import { numberWithSymbol } from "../../../helpers/numberWithSymbol";
import { AmountWithIcon } from "../../../components/AmountWithIcon/AmountWithIcon";
import { AmountDifference } from "../../../components/AmountDifference/AmountDifference";
import { Filter } from "../../../components/Filter/Filter";
import { fakeCollectors } from "./TopCollections.utils";
import styles from "./TopCollections.module.css";

export const TopCollections = () => {
  const column = (start, end, array, className) => {
    const newArr = array.slice(start, end);
    console.log(newArr);

    return (
      <div className={cn(styles.collectorsColumn, className)}>
        {newArr.map(
          (
            { username, account, src, balance, NFTs, balanceDifference, id },
            index
          ) => (
            <div key={id} className={styles.collector}>
              <div className={styles.number}>
                <span>{index + 1}</span>
              </div>
              <div className={styles.imageWrapper}>
                <Image layout="fill" src={src} alt={username} />
              </div>
              <div className={styles.userAndAmount}>
                <div className={styles.username}>
                  <span>{username}</span>
                </div>
                <AmountWithIcon
                  amount={balance}
                  color="primary"
                  size="m"
                  className={styles.amountWithIcon}
                />
              </div>
              <div className={styles.accountAndNFTs}>
                <div className={styles.account}>
                  <span>
                    {`${account.substring(0, 6)}...${account.substring(
                      account.length - 6
                    )}`}
                  </span>
                </div>
                <div className={styles.NFTs}>
                  <span>{`${numberWithSymbol(NFTs, ",")} NFTs`}</span>
                </div>
              </div>
              <AmountDifference
                direction={balanceDifference.direction}
                percent={balanceDifference.percent}
                className={styles.amountDifference}
              />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topPartWrapper}>
        <div className={styles.title}>
          <span>Top Collections</span>
        </div>
        <div className={styles.filters}>
          <Filter
            src="/flag-icon.svg"
            text="United States"
            className={styles.cursorPointer}
          />
          <Filter
            src="/location-arrow-icon.svg"
            text="Michigan"
            className={cn(styles.centralFilter, styles.cursorPointer)}
          />
          <Filter
            src="/location-searching-icon.svg"
            text="25 Miles"
            className={styles.cursorPointer}
          />
        </div>
        <div className={styles.cursorPointer}>
          <Image
            src="/cross-grey-contained.svg"
            height={24}
            width={24}
            alt="cross-icon"
          />
        </div>
      </div>
      <div className={styles.collectorsWrapper}>
        {column(0, 5, fakeCollectors)}
        {column(5, 10, fakeCollectors, styles.centralColumn)}
        {column(10, 15, fakeCollectors)}
      </div>
    </div>
  );
};
