import React from 'react';
import { connect } from 'react-redux';

import { DatePicker } from 'antd';

import Label from '../../atoms/data-entry/Label';
import SelectField from '../../molecules/SelectField';

function InternshipDataForm({ internship, setInternship }) {
  const { RangePicker } = DatePicker;

  const handleDate = (moments) => {
    setInternship({
      startDate: moments[0].toString(),
      endDate: moments[1].toString(),
    });
  };

  const handleSelect = (value) => {
    setInternship({ institution: value });
  };

  console.log(internship);

  return (
    <form className="signup-form" style={{ width: '400px' }}>
      <SelectField
        name="institution"
        label="Hospital"
        onChange={handleSelect}
        value={internship.institution}
      />
      <Label>Fecha</Label>
      <div>
        <RangePicker name="rageDate" onChange={handleDate} />
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
