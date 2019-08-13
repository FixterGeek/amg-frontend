import React from 'react';
// import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DatePicker as Picker } from 'antd';

import Label from '../../atoms/data-entry/Label';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import DatePicker from '../../molecules/DatePicker';

const EducationDataForm = ({ studie, setStudie }) => {
  const { RangePicker } = Picker;

  // const handleSubmit = () => {
  //   history.push("laboral");
  // };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setStudie({ ...studie, [name]: value });
  };

  const handleRange = (moments) => {
    setStudie({
      startDate: moments[0].toString(),
      endDate: moments[1].toString(),
    });
  };

  console.log(studie);

  return (
    <form
      className="signup-form"
      style={{ width: '400px' }}
      // onSubmit={handleSubmit}
    >
      <SelectField
        name="major"
        label="Carrera"
        onChange={handleChange}
      />
      <Label>Periodo de estudio</Label>
      <div className="dates-inline">
        <RangePicker
          onChange={handleRange}
          name="dateRange"
          placeholder="" />
      </div>
      <TextField
        onChange={handleChange}
        label="Año de recepción profesional"
        name="receptionDate"
        value={studie.receptionDate} />
      <TextField
        onChange={handleChange}
        label="Número de cédula profesional"
        name="professionalLicence"
        value={studie.professionalLicence} />
    </form>
  );
};

export default EducationDataForm;
