import React from "react";
import { HorizontalNFTCard } from "./HorizontalNFTCard";

export default {
  title: "HorizontalNFTCard",
  component: HorizontalNFTCard,
};

const Template = (args) => <HorizontalNFTCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  author: "MLB",
  availible: 247,
  chart: "CHART",
  lastUpdate: "24 Hrs",
  price: 147.38,
  priceDifference: 12.47,
  tag: "Athletes",
  title: "Maikel Franco"
};
