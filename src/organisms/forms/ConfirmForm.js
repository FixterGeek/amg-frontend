import React from "react";
import Swal from "sweetalert2";

//import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";
// import CheckBox from "../../molecules/checkbox";

const ConfirmForm = () => {
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
      {/* <CheckBox name="specialty" label="Especialidad" /> */}
      <AmgButton width="100%" htmlType="submit">
        Enviar
      </AmgButton>
    </form>
  );
};

export default ConfirmForm;
