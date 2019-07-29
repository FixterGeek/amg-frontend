import React from "react";
import { Typography } from "antd";
import { Button } from "antd/lib/radio";
import Container from "../../atoms/layout/Container";

function EventCreate() {
  const { Title } = Typography;
  return (
    <div className="admin-container">
      <div>
        <Title className="title-container">Eventos</Title>
      </div>
      <Container className="button-left">
        <button className="button-rectangle">Crear eventos</button>
      </Container>
    </div>
  );
}

export default EventCreate;
