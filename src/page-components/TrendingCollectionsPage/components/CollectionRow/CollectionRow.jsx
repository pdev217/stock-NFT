//next
import Image from 'next/image';
//classnames
import cn from 'classnames';
//styles
import styles from './CollectionRow.module.scss';

export const CollectionRow = ({
  blockchainTypeIcon,
  floorPrice,
  id,
  items,
  last24h,
  last7d,
  logo,
  name,
  number,
  owners,
  volume,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.collectionName}>
        <span className={styles.number}>{number}</span>
        <div className={styles.imageWrapper}>
          {logo && (
            <Image
              src={logo}
              loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/collectionImages/${src}`}
              alt={`${name}-logo`}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={cn(styles.volume, styles.notCollectionName)}>
        {volume > 0 ? (
          <>
            {blockchainTypeIcon && (
              <Image
                alt="blockchain-icon"
                height={19}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={blockchainTypeIcon}
                width={19}
              />
            )}
            <span>{volume}</span>
          </>
        ) : (
          <span>---</span>
        )}
      </div>
      <div className={styles.notCollectionName}>
        {last24h ? (
          <span style={{ color: last24h.color === 'green' ? '#3EAA5B' : '#FB3A50' }}>{last24h.text}</span>
        ) : (
          <span>---</span>
        )}
      </div>
      <div className={styles.notCollectionName}>
        {last7d ? (
          <span style={{ color: last7d.color === 'green' ? '#3EAA5B' : '#FB3A50' }}>{last7d.text}</span>
        ) : (
          <span>---</span>
        )}
      </div>
      <div className={cn(styles.volume, styles.notCollectionName)}>
        {floorPrice ? (
          <>
            {blockchainTypeIcon && (
              <Image
                alt="blockchain-icon"
                height={19}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={blockchainTypeIcon}
                width={19}
              />
            )}
            <span>{floorPrice}</span>
          </>
        ) : (
          <span>---</span>
        )}
      </div>
      <div className={styles.notCollectionName}>{owners}</div>
      <div className={styles.notCollectionName}>
        <span>{items}</span>
      </div>
    </div>
  );
};
