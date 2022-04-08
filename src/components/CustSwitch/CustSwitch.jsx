//mui
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
//component
import { AntSwitch } from "./CustSwitch.utils";

export const CustSwitch = ({ className, checked, onChange }) => {
  console.log('---checked', checked)
  return (
    <div className={className}>
      <Stack direction="row" spacing={1} alignItems="center">
        <AntSwitch
          onChange={onChange}
          checked={checked}
          inputProps={{ "aria-label": "ant design" }}
        />
      </Stack>
    </div>
  );
};
