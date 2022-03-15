import React from "react";
import { HorizontalNFTCard } from "./HorizontalNFTCard";

export default {
  title: "HorizontalNFTCard",
  component: HorizontalNFTCard,
};

const Template = (args) => <HorizontalNFTCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};
