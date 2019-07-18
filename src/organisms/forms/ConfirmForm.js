import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { Typography } from "antd";
import { connect } from "react-redux";
import useAmgService from "../../hooks/services/useAmgService";

import AmgButton from "../../atoms/Button";
import { createUser } from "../../store/actions";
import Container from "../../atoms/layout/Container";
import { Checkbox } from "antd";

function ConfirmForm(props) {
  const { history } = props;

  const { Text, Title } = Typography;

  const [error, setError] = useState({
    name: false,
    dadSurname: false,
    momSurname: false,
    email: false,
    birthDate: false,
    placeOfBirth: false
  });

  const { user, dispatch } = props;
  const { signup } = useAmgService();

  const handleSubmit = e => {
    e.preventDefault();
    signup(
      user.name,
      user.dadSurname,
      user.momSurname,
      user.email,
      user.birthDate,
      user.placleOfBirth
    )
      .then(async ({ data }) => {
        await dispatch(createUser({ ...data.user, userToken: data.token }));
        await localStorage.setItem("authToken", data.token);
        Swal.fire(
          "Genial!",
          "Te cuenta se creo correctamente y te enviamos un correo!",
          "success"
        );
        history.push("/");
      })
      .catch(() => {
        setError({
          name: true,
          dadSurname: true,
          momSurname: true,
          email: true,
          birthDate: true
        });
        Swal.fire({
          type: "error",
          title: "Oops algo salio mal...",
          text: "Vuelve a intentar!"
        });
      });
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
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(ConfirmForm));
