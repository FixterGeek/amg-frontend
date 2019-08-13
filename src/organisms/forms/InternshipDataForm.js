import React from 'react';
import { connect } from 'react-redux';

import TextField from '../../molecules/TextFields';
import Label from '../../atoms/data-entry/Label';
import SelectField from '../../molecules/SelectField';

function InternshipDataForm({ internship, setInternship }) {
  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setInternship({ [name]: value });
  };

  return (
    <form className="signup-form" style={{ width: '400px' }}>
      <SelectField
        name="institution"
        label="Hospital"
        onChange={handleChange}
        value={internship.institution}
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
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(InternshipDataForm);
