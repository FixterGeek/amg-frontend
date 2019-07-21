import React from "react";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import Label from "../../atoms/data_entry/Label";
import { createUser } from "../../store/actions";

import { DatePicker } from "antd";

const EducationDataForm = props => {
  const { user, dispatch } = props;

  const onChangeStudiesData = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ studies: { ...user.studies, [name]: value } }));
  };

  console.log(user);

  return (
    <form className="signup-form" style={{ width: "400px" }}>
      <TextField
        onChange={onChangeStudiesData}
        value={user.studies.major}
        name="major"
        label="Carrera"
      />

      <TextField
        onChange={onChangeStudiesData}
        value={user.studies.institution}
        name="institution"
        label="Institución"
      />

      <Label>Fecha</Label>
      <div className="dates-inline">
        <DatePicker className="date-field" />

        <TextField
          onChange={onChangeStudiesData}
          value={user.studies.startDate}
          name="startDate"
          label="De"
          width="121px"
        />
        <TextField
          onChange={onChangeStudiesData}
          value={user.studies.endDate}
          name="endDate"
          label="A"
          width="121px"
        />
      </div>

      <TextField
        onChange={onChangeStudiesData}
        value={user.studies.receptionDate}
        name="receptionDate"
        label="Año de recepción profesional"
      />

      <TextField
        onChange={onChangeStudiesData}
        value={user.studies.professionalLicence}
        name="professionalLicence"
        label="No. de cédula profesional"
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
