import React from "react";
import { Ribbon } from "./Ribbon";

export default {
  title: "Ribbon",
  component: Ribbon,
};

const Template = (args) => <Ribbon {...args} />;

export const URare = Template.bind({});
URare.args = {
  type: "u-rare"
};

export const Uncmn = Template.bind({});
Uncmn.args = {
    type: "uncmn"
};

export const Common = Template.bind({});
Common.args = {
    type: "common"
};

export const Rare = Template.bind({});
Rare.args = {
    type: "rare"
};