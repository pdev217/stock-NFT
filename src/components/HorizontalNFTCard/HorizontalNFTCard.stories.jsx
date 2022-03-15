import React from "react";
import { HorizontalNFTCard } from "./HorizontalNFTCard";

export default {
  title: "HorizontalNFTCard",
  component: HorizontalNFTCard,
};

const Template = (args) => <HorizontalNFTCard {...args} />;
const data = [
  { name: "Page A", price: 500,},
  { name: "Page A", price: 510,},
  { name: "Page A", price: 300,},
  { name: "Page A", price: 530,},
  { name: "Page A", price: 200,},
  { name: "Page A", price: 250,},
  { name: "Page A", price: 675,},
  { name: "Page A", price: 344,},
  { name: "Page A", price: 500,},
  { name: "Page A", price: 510,},
  { name: "Page A", price: 300,},
  { name: "Page A", price: 530,},
  { name: "Page A", price: 200,},
  { name: "Page A", price: 250,},
  { name: "Page A", price: 675,},
  { name: "Page A", price: 344,},
];

export const Normal = Template.bind({});
Normal.args = {
  author: "MLB",
  availible: 247,
  chartData: data,
  lastUpdate: "24 Hrs",
  price: 147.38,
  priceDifference: {
    difference: 12.43,
    direction: "up"
  },
  tag: "Athletes",
  title: "Maikel Franco",
  src: "/p.png"
};
