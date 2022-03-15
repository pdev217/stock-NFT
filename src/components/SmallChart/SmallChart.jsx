import styles from "./SmallChart.module.css";
import cn from "classnames";
import {
  LineChart,
  Line,
  CartesianAxis,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export const SmallChart = ({ data }) => {
  return (
    <LineChart width={145} height={45} data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <Line
        type="linear"
        dataKey="price"
        stroke="rgb(95, 254, 148)"
        dot={false}
        strokeWidth={1.5}
      />
      <CartesianGrid stroke="rgb(87, 86, 85)" horizontal={false} />
      <XAxis dataKey={{}} tickSize={0} height={1}/>
    </LineChart>
  );
};