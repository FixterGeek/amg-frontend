import React from 'react';
// import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import TextField from '../../molecules/TextFields';
//import AmgButton from "../../atoms/Button";
import Label from '../../atoms/data-entry/Label';
import { createUser } from '../../store/actions';

import DatePicker from '../../molecules/DatePicker';

const EducationDataForm = ({ signup }) => {

  // const handleSubmit = () => {
  //   history.push("laboral");
  // };

  const handleChange = (e) => {
    const {
      target: { value, name }
    } = e;
    // ok
  };

  console.log(signup);

  return (
    <form
      className="signup-form"
      style={{ width: '400px' }}
      // onSubmit={handleSubmit}
    >
      {/* <TextField
        name="major"
        label="Carrera"
        onChange={handleChange}
        value={signup.studies}
      /> */}
      <Label>Fecha</Label>
      <div className="dates-inline">
        <DatePicker
          name="startDate"
          label="De"
          width="121px"
          onChange={handleChange}
        />
        <DatePicker
          name="endDate"
          label="A"
          width="121px"
          onChange={handleChange}
        />
      </div>
      {/* aqui va el input para la cedula */}
    </form>
  );
};

function mapStateToProps(state) {
  return {
    signup: state.signup,
  };
}

export default connect(mapStateToProps)(EducationDataForm);
