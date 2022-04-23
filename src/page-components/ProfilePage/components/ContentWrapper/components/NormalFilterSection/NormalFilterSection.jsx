import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../../../redux/slices/profileFiltrationSlice";
//classnames
import cn from "classnames";
//mui
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
//hooks
import { useDebounce } from "../../../../../../hooks/useDebounce";
import { useStyles } from "../../../../../../hooks/useStyles";
//utils
import { readyFilterOptions } from "./NormalFilterSection.utils";
//styles
import styles from "./NormalFilterSection.module.scss";

export const NormalFilterSection = () => {
  const dispatch = useDispatch();
  const muiClasses = useStyles();

  const initialFilterText = useSelector((state) => state.profileFiltration.filterText);
  const { itemsSelect, readyFilterOption, tokensGridScale } = useSelector((state) => state.profileFiltration);

  const [searchText, setSearchText] = useState(initialFilterText);

  const debouncedSearchText = useDebounce(searchText, 200);

  useEffect(() => {
    dispatch(setData({ field: "filterText", data: debouncedSearchText }));
  }, [debouncedSearchText, dispatch]);

  return (
    <div className={styles.wrapper}>
      <TextField
        className={muiClasses.textField}
        id="search"
        InputProps={{ style: { color: "white" } }}
        label="Search"
        onChange={({ target: { value } }) => setSearchText(value)}
        type="text"
        sx={{ width: "39%" }}
        value={searchText}
        variant="outlined"
      />
      <div className={styles.centralSelect}>
        <Select
          fullWidth
          id="filter-items"
          style={{
            color: "white",
          }}
          onChange={({ target: { value } }) => dispatch(setData({ field: "itemsSelect", data: value }))}
          value={itemsSelect}
          className={muiClasses.select}
        >
          <MenuItem value="Single Items">
            <span>Single Items</span>
          </MenuItem>
          <MenuItem value="All Items">
            <span>All Items</span>
          </MenuItem>
          <MenuItem value="Bundles">
            <span>Bundles</span>
          </MenuItem>
        </Select>
      </div>
      <Select
        fullWidth
        id="filter-items"
        style={{
          color: "white",
        }}
        onChange={({ target: { value } }) => dispatch(setData({ field: "readyFilterOption", data: value }))}
        value={readyFilterOption}
        className={muiClasses.select}
      >
        {readyFilterOptions.map((elem) => (
          <MenuItem key={elem} value={elem}>
            <span>{elem}</span>
          </MenuItem>
        ))}
      </Select>
      <div className={styles.styleButtons}>
        <div
          className={cn({
            [styles.activeButton]: tokensGridScale === "large",
          })}
          onClick={() => dispatch(setData({ field: "tokensGridScale", data: "large" }))}
        />
        <div
          className={cn({
            [styles.activeButton]: tokensGridScale === "medium",
          })}
          onClick={() => dispatch(setData({ field: "tokensGridScale", data: "medium" }))}
        />
      </div>
    </div>
  );
};
