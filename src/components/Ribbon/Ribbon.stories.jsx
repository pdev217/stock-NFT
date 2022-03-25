import React from "react";
import { Ribbon } from "./Ribbon";

export default {
  title: "Ribbon",
  component: Ribbon,
};

const Template = (args) => (
    <div style={{ background: "black" }}>
      <Ribbon {...args} />
    </div>
);

export const Flag = Template.bind({});
Flag.args = {
  
};
