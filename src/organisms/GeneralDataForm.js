import React from "react";
//import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

import TextField from "../molecules/TextFields";
import SelectField from "../molecules/SelectField";
// import useAmgService from "../hooks/services/useAmgService";
import AmgButton from "../atoms/Button";
// import { createUser } from "../store/actions";

function SignupForm() {
  // const { history } = props;
  // const [error, setError] = useState({
  //   name: false,
  //   dadSurname: false,
  //   momSurname: false,
  //   email: false,
  //   password: false,
  //   birthdate: false,
  //   placeOfBirth: false,
  //   specialty: false
  // });

  //const { user, dispatch } = props;
  //const { signup } = useAmgService();

  // const handleChange = e => {
  //   const {
  //     target: { value, name }
  //   } = e;
  //   dispatch(createUser({ [name]: value }));
  // };

  const handleChange = e => {
    console.log(e);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   signup(user.email, user.password)
  //     .then(async ({ data }) => {
  //       await dispatch(createUser({ ...data.user, userToken: data.token }));
  //       await localStorage.setItem("authToken", data.token);
  //       history.push("/dashboard");
  //     })
  //     .catch(() => {
  //       setError({ email: true, password: true });
  //     });
  // };

  const handleSubmit = e => {
    console.log(e);
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <TextField
        //value={user.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />

      <TextField
        //value={user.dadSurname}
        onChange={handleChange}
        name="dadSurname"
        label="Apellido paterno"
      />

      <TextField
        //value={user.momSurname}
        onChange={handleChange}
        name="momSurname"
        label="Apellido materno"
      />

      <TextField
        //value={user.birthdate}
        onChange={handleChange}
        name="birthdate"
        label="Fecha de nacimiento"
      />

      <SelectField
        //value={user.placeOfBirth}
        onChange={handleChange}
        name="placeOfBirth"
        label="Lugar de nacimiento"
      />

      <TextField
        //value={user.specialty}
        onChange={handleChange}
        name="specialty"
        label="Especialidad"
      />

      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
}

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   };
// }

export default SignupForm; // withRouter(connect(mapStateToProps)(SignupForm));
