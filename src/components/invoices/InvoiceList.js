import React from "react";
import { Typography } from "antd";
import Container from "../../atoms/layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faEllipsisV,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Icon } from "antd";

function InvoiceList() {
  const { Title } = Typography;
  return (
    <div className="admin-container">
      <div>
        <Title className="title-container">Facturas</Title>
      </div>
      <div className="button-right">
        <button className="button-rectangle">Generar nueva factura</button>
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
        <p className="label-list">No. de referecia</p>
        <p className="label-list">Concepto</p>
        <p className="label-list">Monto</p>
        <p className="label-list">Método de pago</p>
        <p className="label-list">Acciones</p>
      </Container>
      <Container
        bgColor="#e6f4ff"
        justifyContent="space-around"
        height="49px"
        paddingTop="14px"
        boxSizing="content-box"
      >
        <p className="content-list">HEX389856</p>
        <p className="content-list">Pago membresía</p>
        <p className="content-list">$3200.00</p>
        <p className="content-list">Tarjeta débito</p>
        <p className="content-list">
          <Icon>
            <FontAwesomeIcon icon={faDownload} />
          </Icon>
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

export default InvoiceList;
