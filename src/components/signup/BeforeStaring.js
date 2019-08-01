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
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      flexWrap="nowrap"
    >
      <Container height="100vh" width="50%">
        <div>
          <p className="title-amg">Asociación Mexicana de Gastroenterología</p>
        </div>
        <div style={{ textAlign: "left" }}>
          <p className="title-signup">Registro</p>
          <p className="title-welcome">Bienvenido</p>
          <p className="copy-signup">
            Este es el registro en línea para la Asociación Mexicana de
            Gastroenterología. El formulario tiene una duración aproximada de 15
            minutos.
          </p>
          <Button type="link" className="text-link">
            Formulario para imprimir
            <span className="shapeIcon">
              <img src={icon} alt="Descargar" />
            </span>
          </Button>
          <br />
          <p className="text-tip">Ten a la mano</p>
          <br />
          <div className="text-list">
            <li>Una fotografía tamaño infantil </li>
            <li>Titulo universitario</li>
            <li>Cédula profesional</li>
            <li>Título de la especialidad</li>
            <li>Certficación de especialidad</li>
          </div>
          <br />

          <p className="text-request">
            NOTA: La solicitud de ingreso no podrá ser evaluada hasta contar con
            la documentación completa. Solamente se registrarán en el Directorio
            las especialidades que cuenten con documentación que lo avale.
          </p>
        </div>
        <Container flexGrow={1} height="100px">
          <AmgButton width="60%" htmlType="submit">
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
    </FullScreenContainer>
  );
};

export default BeforeStaring;
