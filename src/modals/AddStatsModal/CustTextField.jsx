import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useStyles } from "../../page-components/CreateNFTPage/CreateNFTPage.utils";

export const CustTextField = ({ name, id }) => {
  const muiClasses = useStyles();
  const [fieldName, setFieldName] = useState(name);

  return (
    <TextField
      fullWidth
      id=""
      label="Name"
      variant="outlined"
      sx={{ marginTop: "16px", width: '45%', maxWidth: '290px', marginRight: '16px' }}
      className={muiClasses.textField}
      value={fieldName}
      onChange={({ target: { value } }) => setFieldName(value)}
      InputLabelProps={{
        style: { color: "#FFFFFF4D" },
      }}
      InputProps={{ style: { color: "white" } }}
    />
  );
};
