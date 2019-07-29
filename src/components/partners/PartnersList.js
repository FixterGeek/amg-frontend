import React from "react";
import { Typography } from "antd";
import Container from "../../atoms/layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Icon } from "antd";

function PartnersList() {
  const { Title } = Typography;
  return (
    <div className="admin-container">
      <div>
        <Title className="title-container">Listado socios</Title>
      </div>
      <div className="button-right">
        <button className="button-rectangle">Exportar a Sheets</button>
      </div>
      <div className="button-right-top">
        <button className="button-top">
          <Icon>
            <FontAwesomeIcon icon={faSearch} />
          </Icon>
        </button>
        <button className="button-top">
          <Icon>
            <FontAwesomeIcon icon={faFilter} />
          </Icon>
        </button>
      </div>

      <Container
        bgColor="#eaf0f7"
        justifyContent="space-around"
        height="49px"
        paddingTop="14px"
        boxSizing="content-box"
      >
        <p className="label-list">Nombre</p>
        <p className="label-list">Especialidad</p>
        <p className="label-list">Rango</p>
        <p className="label-list">Estatus</p>
        <p className="label-list">Acciones</p>
      </Container>
      <Container
        bgColor="#e6f4ff"
        justifyContent="space-around"
        height="49px"
        paddingTop="14px"
        boxSizing="content-box"
      >
        <p className="content-list">Abel Gómez</p>
        <p className="content-list">Gastroeterología</p>
        <p className="content-list">Titular</p>
        <p className="content-list">Al corriente</p>
        <p className="content-list">
          <Icon>
            <FontAwesomeIcon icon={faEllipsisV} />
          </Icon>
        </p>
      </Container>
      <div className="button-right-bottom">
        <button className="button-bottom">
          <Icon>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Icon>
        </button>
        <div className="button-bottom label-center">
          <p className="label-pagination">1</p>
          <p className="label-pagination">de</p>
          <p className="label-pagination">15</p>
        </div>

        <button className="button-bottom">
          <Icon>
            <FontAwesomeIcon icon={faChevronRight} />
          </Icon>
        </button>
      </div>
    </div>
  );
}

export default PartnersList;
