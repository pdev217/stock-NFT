import React from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../redux/store";
import { Filter } from "./Filter";

export default {
  title: "Filter",
  component: Filter,
};

const Template = (args) => (
  <Provider store={store}>
    <div style={{ background: "black" }}>
      <Filter {...args} />
    </div>
  </Provider>
);

export const Flag = Template.bind({});
Flag.args = {
  src: "/flag-icon.svg",
  text: "United States",
};
