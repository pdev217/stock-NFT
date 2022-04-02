import { useEffect, useState } from "react";
//mui
import TextField from "@mui/material/TextField";
//styles
import cssStyles from "./AddToNFTModal.module.css";
import { useStyles } from "../../page-components/CreateNFTPage/CreateNFTPage.utils";

export const CustComposedTextField = ({ value, maxValue, modalData, setModalData, index }) => {
  console.log("---value", value);
  console.log("---maxValue", maxValue);
  const [fieldValue, setfieldValue] = useState(value);
  const [maxFieldValue, setMaxFieldValue] = useState(maxValue);
  const muiClasses = useStyles();
  console.log("---fieldValue", fieldValue);
  console.log("---maxFieldValue", maxFieldValue);

  const handleChange = (newValue, label, index) => {
    console.log("---modalData", modalData);
    const data = [...modalData];

    if (label === "Value") {
      data[index].value = newValue;
      setfieldValue(newValue);
    } else if (label === "Max Value") {
      data[index].maxValue = newValue;
      setMaxFieldValue(newValue);
    }

    setModalData([...data]);
  };

  useEffect(() => {
    if (fieldValue > maxFieldValue) {
      setfieldValue(maxFieldValue);
    }
  }, [fieldValue, maxFieldValue]);

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
        onChange={({ target: { value } }) => handleChange(value, "Value", index)}
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
        value={maxFieldValue}
        onChange={({ target: { value } }) => handleChange(value, "Max Value", index)}
        InputLabelProps={{
          style: { color: "#FFFFFF4D" },
        }}
        InputProps={{ style: { color: "white" } }}
      />
    </div>
  );
};
