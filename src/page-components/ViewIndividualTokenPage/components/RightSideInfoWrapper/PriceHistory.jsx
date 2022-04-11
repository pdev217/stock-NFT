import { useState } from "react";
//next
import Image from "next/image";
//mui
import { Select, MenuItem } from "@mui/material";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//utils
import { priceHistorySelectOptions } from "./RightSideInfoWrapper.utils";
//styles
import styles from "./RightSideInfoWrapper.module.css";

export const PriceHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("none");
  const [average, setAverage] = useState(0);

  const muiClasses = useStyles();

  return (
    <div className={styles.filterAveragePriceWrapper}>
      <Select
        fullWidth
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        style={{
          color: "white",
          width: "308px",
          height: "49px",
        }}
        IconComponent={() => (
          <div style={{ marginRight: "16px" }}>
            <Image src="/view-token/Icon:ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        value={selectedPeriod}
        onChange={({ target: { value } }) => setSelectedPeriod(value)}
        className={muiClasses.select}
      >
        <MenuItem disabled value="none">
          <span style={{ color: "rgb(77, 77, 77)" }}>Select period</span>
        </MenuItem>
        {priceHistorySelectOptions.map(({ id, text }) => (
          <MenuItem key={id} value={text}>
            <span>{text}</span>
          </MenuItem>
        ))}
      </Select>
      <div className={styles.averagePriceWrapper}>
        <div>
          <Image src="/view-token/Icon:Weth.svg" width={19} height={19} alt="eth-icon" />
          <span className={styles.marginLeft4}>{average}</span>
        </div>
        <div>
          <span className={styles.greyVerySmallText}>Average Price</span>
        </div>
      </div>
    </div>
  );
};
