import React from "react";
import { Mainpage3dCarousel } from "./Mainpage3dCarousel";

export default {
  title: "Mainpage3dCarousel",
  component: Mainpage3dCarousel,
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

const NFTCards = [
  {
    id:"qwd1d",
    NFTName: "1111",
    time: "01:09:14:53",
    author: "@Sparktanks",
    code: "0xuhv_76rbkln",
    currPrice: 147.38,
    prevPrices: [
      {
        price: 147.38,
        updated: "7.1 Hrs",
      },
      {
        price: 147.38,
        updated: "7.5 Hrs",
      },
      {
        price: 147.38,
        updated: "8.0 Hrs",
      },
    ],
    chartData,
    views: 1562,
    src: "/p.png",
    tag: "Art & Theater",
  },
  {
    id:"2f121c",
    NFTName: "2222",
    time: "01:09:14:53",
    author: "@Sparktanks",
    code: "0xuhv_76rbkln",
    currPrice: 147.38,
    prevPrices: [
      {
        price: 147.38,
        updated: "7.1 Hrs",
      },
      {
        price: 147.38,
        updated: "7.5 Hrs",
      },
      {
        price: 147.38,
        updated: "8.0 Hrs",
      },
    ],
    chartData,
    views: 1562,
    src: "/p.png",
    tag: "Art & Theater",
  },
  {
    id:"12f24h",
    NFTName: "3333",
    time: "01:09:14:53",
    author: "@Sparktanks",
    code: "0xuhv_76rbkln",
    currPrice: 147.38,
    prevPrices: [
      {
        price: 147.38,
        updated: "7.1 Hrs",
      },
      {
        price: 147.38,
        updated: "7.5 Hrs",
      },
      {
        price: 147.38,
        updated: "8.0 Hrs",
      },
    ],
    chartData,
    views: 1562,
    src: "/p.png",
    tag: "Art & Theater",
  },
];

const Template = (args) => <Mainpage3dCarousel {...args} />;

export const Normal = Template.bind({});

Normal.args = { NFTCards };
