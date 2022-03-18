import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProfilePopup.module.css";

export const ProfilePopup = ({ categories, className }) => (
  <div className={cn(className, styles.wrapper)}> 
    {categories.map(({ categoryName, src, href, id, className }) => (
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
