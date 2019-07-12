import React from "react";
import { Checkbox } from "antd";

function CheckBox() {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return <Checkbox onChange={onChange}>Checkbox</Checkbox>;
}

export default CheckBox;
