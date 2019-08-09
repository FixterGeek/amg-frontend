import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import SelectField from "../../molecules/SelectField";
import AmgButton from "../../atoms/Button";
import { createUser } from "../../store/actions";
import Label from "../../atoms/data_entry/Label";
import Container from "../../atoms/layout/Container";

function CoursesDataForm(props) {
  const { history } = props;
  const { user, dispatch } = props;

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ ...user.residences, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push("laboral");
    // signup(
    //   user.name,
    //   user.dadSurname,
    //   user.momSurname,
    //   user.email,
    //   user.birthDate,
    //   user.placleOfBirth,
    // )
    //   .then(async ({ data }) => {
    //     await dispatch(createUser({ ...data.user, userToken: data.token }));
    //     await localStorage.setItem("authToken", data.token);
    //     console.log(data);
    //     history.push("/education");
    //   })
    //   .catch(() => {
    //     setError({
    //       name: true,
    //       dadSurname: true,
    //       momSurname: true,
    //       email: true,
    //       birthDate: true
    //     });
    //   });
  };

  console.log(user);
  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <TextField
        value={user.residences.institution}
        onChange={handleChange}
        name="institution"
        label="Institución"
      />
      <Label>Fecha</Label>
      <div>
        <TextField
          name="startDate"
          label="De"
          width="121px"
          onChange={handleChange}
        />
        <TextField
          name="endDate"
          label="A"
          width="121px"
          onChange={handleChange}
        />
      </div>
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(CoursesDataForm));
