import React, { useEffect, useState } from 'react';
// import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { DatePicker as Picker, Select, Modal } from 'antd';

import moment from 'moment';
import Label from '../../atoms/data-entry/Label';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import DatePicker from '../../molecules/DatePicker';
import { getStudies, createStudie } from '../../services/studiesServices';
import { writeNewStudy } from '../../store/ducks/signupDuck';

const { Option } = Select;

const EducationDataForm = ({ studie, setStudie, writeNewStudy, newStudy }) => {
  const { RangePicker } = Picker;
  let [studies, setStudies] = useState([]);
  let [open, setOpen] = useState(false);
  let [newStudie, setNewStudie] = useState({});
  useEffect(() => {
    loadStudies();
  }, []);
  //effect
  // const handleSubmit = () => {
  //   history.push("laboral");
  // };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    writeNewStudy({ ...newStudy, [name]: value });
  };

  const handleRange = (moments) => {
    let startDate = moments[0].toString();
    let endDate = moments[1].toString();
    writeNewStudy({ ...newStudy, startDate, endDate });
  };

  function loadStudies() {
    getStudies().then(data => {
      setStudies(data);
    });
  }

  function uploadStudie() {
    createStudie(newStudie)
      .then(() => {
        loadStudies();
      });
  }

  return (
    <div>
      <form
        className="signup-form"
        style={{ width: '400px' }}
      // onSubmit={handleSubmit}
      >

        <SelectField
          name="major"
          label="Carrera"
          onChange={(value) => handleChange({ target: { value, name: "major" } })}
          options={!studies.length ? ["Medico", "Cirujano"] : studies}
          value={newStudy.major}
        />
        <div>
          <a
            onClick={() => setOpen(true)}
          >Agregar Carrera</a>
          <br />
          <br />
        </div>

        <Label>Periodo de estudio</Label>
        <div className="dates-inline">
          <RangePicker
            onChange={handleRange}
            name="dateRange"
            placeholder=""
            value={[moment(newStudy.startDate), moment(newStudie.endDate)]}
          />
        </div>
        <TextField
          onChange={handleChange}
          label="Año de recepción profesional"
          name="receptionDate"
          value={newStudy.receptionDate} />
        <TextField
          onChange={handleChange}
          label="Número de cédula profesional"
          name="professionalLicence"
          value={newStudy.professionalLicence} />
      </form>
      <Modal
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={uploadStudie}
      >
        <TextField
          name="name"
          onChange={({ target: { name, value } }) => setNewStudie({ ...newStudie, [name]: value })}
          label="Nombre de la carrera"
          //name="professionalLicence"
          value={newStudie.name}
        />
        <TextField
          name="institution"
          onChange={({ target: { name, value } }) => setNewStudie({ ...newStudie, [name]: value })}
          label="Nombre de la Institución"
          //name="professionalLicence"
          value={newStudie.institution}
        />
      </Modal>
    </div>
  );
};

function mapState({ signup }) {
  return {
    newStudy: signup.newStudy
  };
}

export default connect(mapState, { writeNewStudy })(EducationDataForm);
