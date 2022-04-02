import { useEffect, useState } from "react";
//mui
import TextField from "@mui/material/TextField";
//styles
import cssStyles from "./AddToNFTModal.module.css";
import { useStyles } from "../../page-components/CreateNFTPage/CreateNFTPage.utils";

export const CustComposedTextField = ({ value, max }) => {
  const [fieldValue, setfieldValue] = useState(value || 3);
  const [maxValue, setMaxValue] = useState(max || 5);
  const muiClasses = useStyles();

  useEffect(() => {
    if (fieldValue > maxValue) {
      setfieldValue(maxValue);
    }
  }, [fieldValue, maxValue])

  return (
    <div className={cssStyles.select}>
      <TextField
        fullWidth
        id=""
        type="number"
        label="Value"
        variant="outlined"
        sx={{ width: "40%" }}
        className={muiClasses.textFieldLeftHalf}
        value={fieldValue}
        onChange={({ target: { value } }) => setfieldValue(value)}
        InputLabelProps={{
          style: { color: "#FFFFFF4D" },
        }}
        InputProps={{ style: { color: "white" } }}
      />
      <div className={cssStyles.of}>
        <span>Of</span>
      </div>
      <TextField
        fullWidth
        id=""
        label="Max Value"
        type="number"
        variant="outlined"
        sx={{ width: "40%" }}
        className={muiClasses.textFieldRightHalf}
        value={maxValue}
        onChange={({ target: { value } }) => setMaxValue(value)}
        InputLabelProps={{
          style: { color: "#FFFFFF4D" },
        }}
        InputProps={{ style: { color: "white" } }}
      />
    </div>
  );
};
