import React from "react";
import { Steps } from "antd";

function Steper() {
  const { Step } = Steps;
  return (
    <Steps direction="vertical" current={1}>
      <Step title="Datos generales" />
      <Step title="Educación" />
      <Step title="Datos laborales" />
      <Step title="Datos fiscales" />
    </Steps>
  );
}

export default Steper;
