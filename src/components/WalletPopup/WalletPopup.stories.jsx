import React from "react";
import { WalletPopup } from "./WalletPopup";

export default {
  title: "WalletPopup",
  component: WalletPopup,
};

const Template = (args) => <WalletPopup {...args} />;

const data = [
  { categoryName: "Profile", href: "#", src: "/profile-without-circle.svg", id: '1' },
  { categoryName: "Favourites", href: "#", src: "/favourites-icon.svg", id: '2' },
  { categoryName: "Watchlist", href: "#", src: "/eye-icon.svg", id: '3' },
  { categoryName: "My collections", href: "#", src: "/collections-icon.svg", id: '4' },
  { categoryName: "Settings", href: "#", src: "/settings-icon.svg", id: '5' },
];

export const Chart = Template.bind({});
Chart.args = {
  categories: data,
};
