import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/download.svg";
import { Typography, Button } from "antd";

import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import { palette, size } from "../../styles/theme";

import AmgButton from "../../atoms/Button";

const BeforeStaring = () => {
  const { Text, Title } = Typography;
  return (
    <div className="signup-container">
      <Container height="100vh" width="50%">
        <Container
          alignItems="flex-start"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
          style={{
            maxWidth: "445px",
            maxHeight: "100vh",
            flexDirection: "column"
          }}
        >
          <Container flexGrow={1} height="100px">
            <div style={{ textAlign: "left" }}>
              <Title>Registro</Title>
              <Title level={3} style={{ margin: 0 }}>
                Bienvenido
              </Title>
              <Container flexGrow={1} height="100px">
                <Text>
                  Este es el registro en línea para la Asociación Mexicana de
                  Gastroenterología. El formulario tiene una duración aproximada
                  de 15 minutos.
                </Text>
              </Container>

              <Container flexGrow={5} height="auto">
                <Button type="link" style={{ padding: 0 }}>
                  Formulario para imprimir
                  <span className="shapeIcon">
                    <img src={icon} alt="Descargar" />
                  </span>
                </Button>
              </Container>
            </div>
          </Container>
          <Container flexGrow={1} height="100px" />
          <div style={{ textAlign: "left" }}>
            <Title level={3} style={{ margin: 0 }}>
              Ten a la mano
            </Title>
            <br />
            <div style={{ textAlign: "left" }}>
              <li>Una fotografía tamaño infantil </li>
              <li>Titulo universitario</li>
              <li>Cédula profesional</li>
              <li>Título de la especialidad</li>
              <li>Certficación de especialidad</li>
            </div>
            <br />
            <Container flexGrow={1} height="100px">
              <Text style={{ textAlign: "left" }} height="66px" width="540px">
                NOTA: La solicitud de ingreso no podrá ser evaluada hasta contar
                con la documentación completa. Solamente se registrarán en el
                Directorio las especialidades que cuenten con documentación que
                lo avale.
              </Text>
            </Container>
          </div>
        </Container>
        <Container flexGrow={1} height="100px">
          <AmgButton width="100%" htmlType="submit">
            <Link to="/signup/general">Comenzar</Link>
          </AmgButton>
        </Container>
      </Container>
      <Container
        className="signup-right"
        bgColor={palette.secondary}
        height="135vh"
        width="50%"
        paddingTop={size.largePadding}
        paddingBottom={size.largePadding}
      >
        <div className="signup-bg">
          <div className="signup-logo" />
        </div>
      </Container>
    </div>
  );
};

export default BeforeStaring;
