import React from "react";
import { Typography } from "antd";
import EventCreateForm from "../../organisms/forms/EventCreateForm";
import SpeakerForm from "../../organisms/forms/SpeakerForm";
import Container from "../../atoms/layout/Container";

function EventCreate() {
  const { Title, Text } = Typography;
  return (
    <div className="admin-container">
      <div>
        <Title className="title-container">Subir evento</Title>
      </div>
      <div className="inline-elements">
        <Text className="title-left">Evento</Text>
        <div className="button-right">
          <button className="button-rectangle">Guardar como borrador</button>
        </div>
      </div>
      <EventCreateForm />
      <div className="inline-elements">
        <Text className="title-left">Ponentes</Text>
      </div>
      <div className="button-center button-right">
        <button className="button-rectangle">Agregar otro +</button>
      </div>
      <SpeakerForm />
    </div>
  );
}

export default EventCreate;
