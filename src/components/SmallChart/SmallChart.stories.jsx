import React from "react";
import { SmallChart } from "./SmallChart";

export default {
  title: "SmallChart",
  component: SmallChart,
};

const Template = (args) => (
    <SmallChart {...args} />
);

const data = [
  { name: "Page A", price: 500,},
  { name: "Page A", price: 510,},
  { name: "Page A", price: 300,},
  { name: "Page A", price: 530,},
  { name: "Page A", price: 200,},
  { name: "Page A", price: 250,},
  { name: "Page A", price: 675,},
  { name: "Page A", price: 344,},
  
];

export const Chart = Template.bind({});
Chart.args = {
  data,
};
