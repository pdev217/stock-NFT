import React from "react";
import { PriceWithIcon } from "./PriceWithIcon";

export default {
  title: "PriceWithIcon",
  component: PriceWithIcon,
};

const Template = (args) => <PriceWithIcon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  price: 432.65,
  color: "primary",
  size: "m"
};

export const Red = Template.bind({});
Red.args = {
  price: 432.65,
  color: "red",
  size: "m"
};

export const Small = Template.bind({});
Small.args = {
  price: 432.65,
  color: "primary",
  size: "sm"
};