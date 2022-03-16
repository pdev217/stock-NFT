import React from "react";
import { SpecialAuctionNFTCard } from "./SpecialAuctionNFTCard";

export default {
  title: "SpecialAuctionNFTCard",
  component: SpecialAuctionNFTCard,
};

const chartData = [
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

const Template = (args) => <SpecialAuctionNFTCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  NFTName: " Remnant 003 #376/500",
  time: '01:09:14:53',
  author: '@Sparktanks',
  code: '0xuhv_76rbkln',
  currPrice: 147.38,
  prevPrices: [
    {
      price: 147.38,
      updated: '7.1 Hrs'
    },
    {
      price: 147.38,
      updated: '7.5 Hrs'
    },
    {
      price: 147.38,
      updated: '8.0 Hrs'
    },
  ],
  chartData,
  views: 1562,
  src: '/p.png',
  tag: "Art & Theater",
};
