import React from "react";

import { Steps } from "antd";

export default ({ current, onChange }) => {
  return <Steps onChange={onChange} direction="vertical" className="Oval-3" />;
};
