import React from "react";
import Swal from "sweetalert2";
import { Typography } from "antd";

import AmgButton from "../../atoms/Button";
import Container from "../../atoms/layout/Container";
import { Checkbox } from "antd";

const ConfirmForm = () => {
  const { Text, Title } = Typography;
  const handleSubmit = e => {
    e.preventDefault();
    Swal.fire(
      "Genial!",
      "Te cuenta se creo correctamente y te enviamos un correo!",
      "success"
    );
    console.log("test");
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <Container
        flexGrow={1}
        height="100px"
        bgColor="#f7f7f7"
        height="200px"
        alignItems="center"
      >
        <div style={{ textAlign: "center" }}>
          <Title level={4} style={{ margin: 0 }}>
            Términos y condiciones
          </Title>
          <Text>
            La Asociación Mexicana de Gastroenterología A.C. ubicada en Nicolás
            San Juan 233 Col del Valle
          </Text>
        </div>
      </Container>
      <Checkbox name="specialty" label="Especialidad">
        He leído los términos y condiciones de la Solicitud de Ingreso a la
        Asociación Mexicana de Gastroenterología.
      </Checkbox>
      <AmgButton width="100%" htmlType="submit">
        Enviar
      </AmgButton>
    </form>
  );
};

export default ConfirmForm;
