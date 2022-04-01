import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import cssStyles from "./AddStatsModal.module.css";
import { useStyles } from "../../page-components/CreateNFTPage/CreateNFTPage.utils";
import { numbers } from "./AddStatsModal.utils";
import { useState } from "react";

export const CustSelect = ({ value, id }) => {
  const [selectValue, setSelectValue] = useState(value);
  console.log(value)
  const muiClasses = useStyles();

  return (
    <div className={cssStyles.select}>
      <Select
        fullWidth
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        style={{
          color: "white",
          width: "40%",
        }}
        inputProps={{
          classes: {
            icon: muiClasses.icon,
          },
        }}
        onChange={({ target: { value } }) => setSelectValue(value)}
        value={selectValue || "none"}
        className={muiClasses.select}
      >
        <MenuItem disabled value="none">
          <span style={{ color: "var(--light-grey)" }}>Select</span>
        </MenuItem>
        {numbers.map(({ id, value }) => (
          <MenuItem key={id} value={value}>
            <span>{value}</span>
          </MenuItem>
        ))}
      </Select>
      <div className={cssStyles.of}>
        <span>Of</span>
      </div>
      <div className={cssStyles.endOfSelect}>5</div>
    </div>
  );
};
