import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Checkbox } from 'antd';

import { populateInstitutionsAction } from '../../../store/ducks/institutionsDuck';
import SelectField from '../../../molecules/SelectField';
import RangeDatePicker from './RangeDatePicker';
import Label from '../../../atoms/data-entry/Label';


function LaboralForm({
  user, institutionsArray, populateInstitutionsAction, onChange,
}) {
  const [activity, setActivity] = useState({
    institution: null,
    type: null,
    startDate: null,
    endDate: null,
  });


  useEffect(() => {
    if (!institutionsArray[0]) {
      populateInstitutionsAction()
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }, []);

  useEffect(() => {
    onChange(activity);
  }, [activity]);


  const handleChange = ({ target }) => {
    const { name, value } = target;
    setActivity({ ...activity, [name]: value });
  };

  const handleDate = (moments) => {
    setActivity({ ...activity, startDate: moments[0].toString(), endDate: moments[1].toString() });
  };

  return (
    <form>
      <SelectField
        onChange={value => handleChange({ target: { value, name: 'institution' } })}
        useKeys={['_id', '_id', 'name']}
        value={activity.institution}
        options={institutionsArray}
        label="intitución" />
      <div>
        <Label>Institución propia</Label>
        <Checkbox
          onChange={() => handleChange({ target: { value: user, name: 'user' } })}
          value={activity.user !== null} />
      </div>
      <SelectField
        onChange={value => handleChange({ target: { value, name: 'type' } })}
        options={['Hospitalaria', 'Docente', 'Sociedad']}
        value={activity.type}
        label="Tipos de labor" />
      <RangeDatePicker
        onChange={handleDate}
        label="Periodo"
        dateOne={activity.startDate}
        dateTwo={activity.endDate} />
    </form>
  );
}

function mapStateToProps({ user, institutions }) {
  return {
    institutionsArray: institutions.institutionsArray,
    user: user._id,
  };
}

export default connect(mapStateToProps, { populateInstitutionsAction })(LaboralForm);
