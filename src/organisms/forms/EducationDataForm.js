import React from "react";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
//import AmgButton from "../../atoms/Button";
import Label from "../../atoms/data_entry/Label";
import { createUser } from "../../store/actions";
import Container from "../../atoms/layout/Container";

const EducationDataForm = props => {
  const { user, dispatch } = props;

  // const handleSubmit = () => {
  //   history.push("laboral");
  // };

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ ...user.studies, [name]: value }));
  };

  console.log(user);

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      // onSubmit={handleSubmit}
    >
      <TextField
        name="major"
        label="Carrera"
        onChange={handleChange}
        value={user.studies.major}
      />
      <Label>Fecha</Label>
      <div className="dates-inline">
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
      <TextField
        name="emailreceptionDate"
        label="Año de recepción profesional"
        onChange={handleChange}
      />
      <TextField
        name="professionalLicence"
        label="No. de cédula profesional"
        onChange={handleChange}
      />
      {/* aqui va el input para la cedula */}
    </form>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(EducationDataForm);
