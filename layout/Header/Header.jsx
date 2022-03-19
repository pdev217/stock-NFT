import { useRef } from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { open as openProfilePopupReducer } from "../../src/redux/slices/profilePopupSlice";
import { open as openWalletPopupReducer } from "../../src/redux/slices/walletPopupSlice";
import Image from "next/image";
import { Username } from "../../src/components/Username/Username";
import { AmountWithIcon } from "../../src/components/AmountWithIcon/AmountWithIcon";
import { AmountDifference } from "../../src/components/AmountDifference/AmountDifference";
import { SmallChart } from "../../src/components/SmallChart/SmallChart";
import { ProfilePopup } from "../../src/components/ProfilePopup/ProfilePopup";
import { routingCategories } from "./Header.utils";
import styles from "./Header.module.css";

const fakeChartData = [
  { name: "Page A", price: 500 },
  { name: "Page A", price: 510 },
  { name: "Page A", price: 300 },
  { name: "Page A", price: 530 },
  { name: "Page A", price: 200 },
  { name: "Page A", price: 250 },
  { name: "Page A", price: 675 },
  { name: "Page A", price: 344 },
  { name: "Page A", price: 300 },
  { name: "Page A", price: 530 },
  { name: "Page A", price: 560 },
];

const fakeCategories = [
  {
    categoryName: "Profile",
    href: "#",
    src: "/profile-without-circle.svg",
    id: "1",
  },
  {
    categoryName: "Favourites",
    href: "#",
    src: "/favourites-icon.svg",
    id: "2",
  },
  { categoryName: "Watchlist", href: "#", src: "/eye-icon.svg", id: "3" },
  {
    categoryName: "My collections",
    href: "#",
    src: "/collections-icon.svg",
    id: "4",
  },
  { categoryName: "Settings", href: "#", src: "/settings-icon.svg", id: "5" },
];

export const Header = ({ isAuthorised }) => {
  const dispatch = useDispatch();
  const isProfilePopupOpened = useSelector(
    (state) => state.profilePopup.profilePopup.isOpened
  );

  const openProfilePopup = () => {
    dispatch(openProfilePopupReducer());
  };

  const openWalletPopup = () => {
    dispatch(openWalletPopupReducer());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/header-logo.png" height={106} width={267} alt="logo" />
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationCategories}>
          {routingCategories.map(({ categoryName, id, src }) => (
            <div className={styles.category} key={id}>
              <Image src={src} height={18} width={16} alt={categoryName} />
              <p className={styles.categoryName}>{categoryName}</p>
            </div>
          ))}
        </div>
        <div className={styles.searchButton}>
          <Image
            src="/search-icon.svg"
            height={18}
            width={16}
            alt="search-icon"
          />
          <div>Search All NFTs</div>
        </div>
      </div>

      <div className={styles.unAuthUserData}>
        <div className={styles.profile} onClick={openProfilePopup}>
          <div className={isAuthorised ? styles.authorisedIcon : styles.profileIcon}>
            <Image
              src={isAuthorised ? "/some-man.png" : "/profile-icon.svg"}
              layout="fill"
              alt={isAuthorised ? "user-avatar" : "profile-icon"}
            />
          </div>
          <div className={styles.profileText}>Profile</div>
          <ProfilePopup
            categories={fakeCategories}
            className={cn(styles.profilePopup, {
              [styles.popupActive]: isProfilePopupOpened,
            })}
            isAuthorised={isAuthorised}
          />
        </div>
        <div className={styles.wallet} onClick={openWalletPopup}>
          <div className={styles.walletIcon}>
            <Image src="/wallet-icon.svg" layout="fill" alt="profile-icon" />
          </div>
          <div className={styles.walletText}>Wallet</div>
        </div>
      </div>
    </header>
  );
};

// We have 2 variants of header and I don't know which one to implement
{
  /* <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/header-logo.png" height={106} width={267} alt="logo" />
      </div>
      <div className={styles.navigation}>
        <div className={styles.navigationCategories}>
          {routingCategories.map(({ categoryName, id, src }) => (
            <div className={styles.category} key={id}>
              <Image src={src} height={18} width={16} alt={categoryName} />
              <p className={styles.categoryName}>{categoryName}</p>
            </div>
          ))}
        </div>
        <div className={styles.searchButton}>
          <Image
            src="/search-icon.svg"
            height={18}
            width={16}
            alt="search-icon"
          />
          <div>Search All NFTs</div>
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userAvatarAndName}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/empty-avatar.png"
              height={29}
              width={29}
              alt="avatar"
            />
          </div>
          <div className={styles.clickableUserInfo}>
            <Username
              username="test-user"
              color="white"
              isConfirmed={false}
              className={styles.username}
            />
            <Image
              src="/delta-down-icon.svg"
              height={9}
              width={15}
              alt="avatar"
            />
          </div>
        </div>
        <div className={styles.userWorth}>
          <div className={styles.amountNumbers}>
            <AmountWithIcon amount={82828.28} color="primary" size="m" className={styles.amountData} />
            <AmountDifference direction="up" percent={12.47} className={styles.amountData} />
          </div>
          <div className={styles.chart}>
            <SmallChart data={fakeChartData} />
          </div>
        </div>
      </div>
    </header> */
}
