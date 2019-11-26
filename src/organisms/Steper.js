import React from "react";
import { Steps } from "antd";
import { withRouter } from "react-router-dom";

function Steper({ history }) {
  const { location } = history;


  const { pathname } = location;

  const url = pathname.split("/");

  const currentPath =
    url[url.length - 1] === "general"
      ? 0
      : url[url.length - 1] === "education"
      ? 1
      : url[url.length - 1] === "laboral"
      ? 2
      : 3;

  const { Step } = Steps;
  return (
    <Steps direction="vertical" current={currentPath}>
      <Step title="Datos generales" />
      <Step title="Educación" />
      <Step title="Datos laborales" />
      <Step title="Datos fiscales" />
    </Steps>
  );
}

export default withRouter(Steper);
