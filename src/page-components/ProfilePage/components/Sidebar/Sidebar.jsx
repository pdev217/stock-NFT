import { useState, useEffect } from 'react';
//next
import Image from 'next/image';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setData,
  deleteFromArray,
  deleteFromArrayOfObjects,
  getItems,
  clearOffsetAndItems,
} from '../../../../redux/slices/profileFiltrationSlice';
import { open as openError } from '../../../../redux/slices/errorSnackbarSlice';
import {
  getAllCurrencies,
  getAllCollections,
  getAllChains,
  clearError,
} from '../../../../redux/slices/generalDataSlice';
//mui
import TextField from '@mui/material/TextField';
//components
import { Price } from './components/Price/Price';
//hooks
import { useStyles } from '../../../../hooks/useStyles';
import { useDebounce } from '../../../../hooks/useDebounce';
//classnames
import cn from 'classnames';
//utils
import { getSections, statuses, getSectionsForUseState, eventTypes } from './Sidebar.utils';
//styles
import styles from './Sidebar.module.scss';

export const Sidebar = ({ isOpened, handleToggleSidebar, choosenTopSection }) => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();

  //useSelectors
  const {
    selectedCategories,
    selectedChains,
    selectedCollections,
    selectedEventTypes,
    selectedOnSaleIn,
    selectedStatuses,
  } = useSelector((state) => state.profileFiltration);
  const { chains, collections, error, currencies, categories } = useSelector((state) => state.generalData);
  //useStates
  // this state will contain such data as { status: false, price: false, collections: false ...etc}
  const [openedSections, setOpenedSections] = useState(getSectionsForUseState(choosenTopSection));
  //here it was fakeOnSaleIn
  const [onSalesInRows, setOnSalesInRows] = useState([]);
  const [onSalesInSearch, setOnSalesInSearch] = useState(selectedOnSaleIn.filter);
  const [collectionsRows, setCollectionsRows] = useState(collections);
  const [collectionsSearch, setCollectionsSearch] = useState(selectedCollections.filter);

  const debouncedOnSalesInSearch = useDebounce(onSalesInSearch, 200);
  const debouncedCollectionSearch = useDebounce(collectionsSearch, 200);

  const iconLoader = ({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`;

  const handleGetNewItems = () => {
    dispatch(clearOffsetAndItems());
    dispatch(getItems());
  };
  
  const handleToggleSection = (section) =>
    setOpenedSections({ ...openedSections, [section]: !openedSections[section] });

  const handleToggleStatus = (status, text) => {
    const statusesStringsArray = selectedStatuses.map((elem) => elem.name);
    if (statusesStringsArray.includes(status)) {
      dispatch(deleteFromArrayOfObjects({ field: 'selectedStatuses', objectField: 'name', data: status }));
      handleGetNewItems();
    } else {
      dispatch(setData({ field: 'selectedStatuses', data: [...selectedStatuses, { name: status, text }] }));
      handleGetNewItems();
    }
  };

  const handleToggleEventType = (eventType, text) => {
    const eventTypesStringsArray = selectedEventTypes.map((elem) => elem.name);
    if (eventTypesStringsArray.includes(eventType)) {
      dispatch(deleteFromArrayOfObjects({ field: 'selectedEventTypes', objectField: 'name', data: eventType }));
      handleGetNewItems();
    } else {
      dispatch(setData({ field: 'selectedEventTypes', data: [...selectedEventTypes, { name: eventType, text }] }));
      handleGetNewItems();
    }
  };

  const handleToggleCategory = (category, icon, id) => {
    const collectionsStringsArray = selectedCategories.map((elem) => elem.name);

    if (collectionsStringsArray.includes(category)) {
      dispatch(deleteFromArrayOfObjects({ field: 'selectedCategories', objectField: 'name', data: category }));
      handleGetNewItems();
    } else {
      dispatch(setData({ field: 'selectedCategories', data: [...selectedCategories, { name: category, icon, id }] }));
      handleGetNewItems();
    }
  };

  const handleToggleChains = (chain, icon, id) => {
    const chainsStringsArray = selectedChains.map((elem) => elem.name);

    if (chainsStringsArray.includes(chain)) {
      dispatch(deleteFromArrayOfObjects({ field: 'selectedChains', objectField: 'name', data: chain }));
      handleGetNewItems();
    } else {
      dispatch(setData({ field: 'selectedChains', data: [...selectedChains, { name: chain, icon, id }] }));
      handleGetNewItems();
    }
  };

  // const handleToggleOnSaleIn = (onSaleIn) => {
  //   if (selectedOnSaleIn.rows.includes(onSaleIn)) {
  //     dispatch(deleteFromArray({ field: 'selectedOnSaleIn', data: { ...selectedOnSaleIn, rows: onSaleIn } }));
  //     handleGetNewItems();
  //   } else {
  //     dispatch(
  //       setData({
  //         field: 'selectedOnSaleIn',
  //         data: { ...selectedOnSaleIn, rows: [...selectedOnSaleIn.rows, onSaleIn] },
  //       })
  //     );
  //     handleGetNewItems();
  //   }
  // };

  const handleToggleCollections = (collection, id, icon) => {
    const collectionsStringsArray = selectedCollections.rows.map((elem) => elem.name);

    if (collectionsStringsArray.includes(collection)) {
      dispatch(
        deleteFromArrayOfObjects({
          field: 'selectedCollections',
          objectField: 'name',
          data: { rows: collection },
        })
      );
      handleGetNewItems();
    } else {
      dispatch(
        setData({
          field: 'selectedCollections',
          data: {
            ...selectedCollections,
            rows: [...selectedCollections.rows, { name: collection, icon, id }],
          },
        })
      );
      handleGetNewItems();
    }
  };

  //useEffects

  useEffect(() => {
    if (error) {
      dispatch(
        openError(
          error.response?.data ? `${error.response.data.statusCode} ${error.response.data.message}` : error.message
        )
      );
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getAllCollections());
    chains.length === 0 && dispatch(getAllChains());
    currencies.length === 0 && dispatch(getAllCurrencies());
  }, [dispatch, currencies, chains]);

  useEffect(() => {
    dispatch(
      setData({
        field: 'selectedOnSaleIn',
        data: {
          ...selectedOnSaleIn,
          filter: debouncedOnSalesInSearch,
        },
      })
    );

    setOnSalesInRows(
      // it was fakeOnSaleIn
      [].filter(({ name }) => name.toLowerCase().includes(debouncedOnSalesInSearch.toLowerCase()))
    );
  }, [debouncedOnSalesInSearch]);

  useEffect(() => {
    dispatch(
      setData({
        field: 'selectedCollections',
        data: {
          ...selectedCollections,
          filter: debouncedCollectionSearch,
        },
      })
    );

    setCollectionsRows(
      collections.filter(({ name }) => name.toLowerCase().includes(debouncedCollectionSearch.toLowerCase()))
    );
  }, [debouncedCollectionSearch, collections]);

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.closedSidebar]: !isOpened,
      })}
    >
      <div className={styles.filterTop}>
        <div>
          <Image src="/profile/Icon-Filter.svg" width={19} height={19} alt="filter-icon" />
          <span>FILTER</span>
        </div>
        <span onClick={handleToggleSidebar}>
          {isOpened ? (
            <Image src="/profile/Icon-Left.svg" alt="icon-left" width={19} height={19} />
          ) : (
            <Image src="/profile/Icon-Right.svg" alt="icon-left" width={19} height={19} />
          )}
        </span>
      </div>
      {getSections(choosenTopSection).map(({ text, section }) => (
        <div key={section}>
          <div className={styles.section} onClick={() => handleToggleSection(section)}>
            <span>{text}</span>
            {openedSections[section] ? (
              <Image src="/view-token/Icon-ArrowUp.svg" width={19} height={19} alt="arrow-icon" />
            ) : (
              <Image src="/view-token/Icon-ArrowDown.svg" width={19} height={19} alt="arrow-icon" />
            )}
          </div>
          {section === 'status' && (
            <div
              className={cn(styles.sectionContent, styles.statusesWrapper, {
                [styles.sectionClosed]: !openedSections.status,
              })}
            >
              {statuses.map(({ text, status }) => (
                <div
                  className={cn(styles.status, {
                    [styles.statusChoosen]: selectedStatuses.map((elem) => elem.name).includes(status),
                  })}
                  key={status}
                  onClick={() => handleToggleStatus(status, text)}
                >
                  <span>{text}</span>
                </div>
              ))}
            </div>
          )}
          {section === 'eventType' && (
            <div
              className={cn(styles.sectionContent, styles.statusesWrapper, {
                [styles.sectionClosed]: !openedSections.eventType,
              })}
            >
              {eventTypes.map(({ text, eventType }) => (
                <div
                  className={cn(styles.status, {
                    [styles.statusChoosen]: selectedEventTypes.map((elem) => elem.name).includes(eventType),
                  })}
                  key={eventType}
                  onClick={() => handleToggleEventType(eventType, text)}
                >
                  <span>{text}</span>
                </div>
              ))}
            </div>
          )}
          {section === 'price' && (
            <div
              className={cn(styles.sectionContent, {
                [styles.sectionClosed]: !openedSections.price,
              })}
            >
              <Price currencies={currencies} />
            </div>
          )}
          {section === 'collections' && (
            <div
              className={cn(styles.sectionContent, {
                [styles.sectionClosed]: !openedSections.collections,
              })}
            >
              <TextField
                fullWidth
                id="searchBar"
                label="Filter"
                type="text"
                variant="outlined"
                className={muiClasses.textField}
                value={collectionsSearch}
                onChange={({ target: { value } }) => setCollectionsSearch(value)}
                InputProps={{ style: { color: 'white' } }}
              />
              <div className={styles.scrollable}>
                {collectionsRows.map(({ name, id, logoImage }) => (
                  <div key={name} className={styles.collection} onClick={() => handleToggleCollections(name, id)}>
                    <div className={styles.collectionIcon}>
                      {selectedCollections.rows.map((elem) => elem.name).includes(name) ? (
                        <Image src="/Icon_Check.svg" width={19} height={19} alt="icon-checked" />
                      ) : logoImage ? (
                        <Image
                          alt="collection-logo"
                          layout="fill"
                          loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/collectionImages/${src}`}
                          objectFit="cover"
                          src={logoImage}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {section === 'chains' && (
            <div
              className={cn(styles.sectionContent, {
                [styles.sectionClosed]: !openedSections.chains,
              })}
            >
              {chains.map(({ name, icon, id }) => (
                <div key={name} className={styles.chain} onClick={() => handleToggleChains(name, icon, id)}>
                  <div className={styles.chainIcon}>
                    {selectedChains.map((elem) => elem.name).includes(name) ? (
                      <Image src="/Icon_Check.svg" width={19} height={19} alt="icon-checked" />
                    ) : icon ? (
                      <Image src={icon} loader={iconLoader} width={19} height={19} alt="icon-chain" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          )}
          {section === 'categories' && (
            <div
              className={cn(styles.sectionContent, {
                [styles.sectionClosed]: !openedSections.categories,
              })}
            >
              {categories.map(({ name, icon, id }) => (
                <div key={name} className={styles.chain} onClick={() => handleToggleCategory(name, icon, id)}>
                  <div className={styles.chainIcon}>
                    {selectedCategories.map((elem) => elem.name).includes(name) ? (
                      <Image src="/Icon_Check.svg" width={19} height={19} alt="icon-checked" />
                    ) : icon ? (
                      <Image src={icon} loader={iconLoader} width={19} height={19} alt="icon-chain" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          )}
          {/* {section === 'onSaleIn' && (
            <div
              className={cn(styles.sectionContent, {
                [styles.sectionClosed]: !openedSections.onSaleIn,
              })}
            >
              <TextField
                fullWidth
                id="searchBar"
                label="Filter"
                type="text"
                variant="outlined"
                className={muiClasses.textField}
                value={onSalesInSearch}
                onChange={({ target: { value } }) => setOnSalesInSearch(value)}
                InputProps={{ style: { color: 'white' } }}
              />
              <div className={styles.scrollable}>
                {onSalesInRows.map(({ name, id }) => (
                  <div key={id} className={styles.onSaleInRow}>
                    <Checkbox
                      sx={{
                        color: 'var(--light-grey)',
                        '&.Mui-checked': {
                          color: 'var(--light-grey)',
                        },
                        position: 'relative',
                        bottom: '1px',
                      }}
                      checked={selectedOnSaleIn.rows.includes(name)}
                      onChange={() => handleToggleOnSaleIn(name)}
                    />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};
