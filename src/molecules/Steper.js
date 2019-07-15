import React from "react";
import { Steps } from "antd";

const { Step } = Steps;

export default () => {
  return (
    <Steps direction="vertical">
      <Step title="Datos generales" />
      <Step title="Datos profesionales" />
      <Step title="Educación" />
      <Step title="Datos físcales s" />
    </Steps>
  );
};
