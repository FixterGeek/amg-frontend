import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Checkbox } from 'antd';

import { populateInstitutionsAction } from '../../../store/ducks/institutionsDuck';
import TextField from '../../../molecules/TextFields';
import SelectField from '../../../molecules/SelectField';
import RangeDatePicker from './RangeDatePicker';
import Label from '../../../atoms/data-entry/Label';
import Spinner from '../../reusables/Spinner';


function LaboralForm({
  user, institutionsArray, populateInstitutionsAction, onChange,
  lastInstitution, disabledOwn, fetching, activityFetching,
  activitiesOptions,
}) {
  const [activity, setActivity] = useState({
    user: '',
    institution: null,
    institutionOwner: '',
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
    setActivity({ ...activity, user: user._id })
  }, [user]);

  useEffect(() => {
    if (onChange) onChange(activity);
  }, [activity]);

  useEffect(() => {
    if (lastInstitution) setActivity({ ...activity, institution: lastInstitution });
  }, [lastInstitution]);


  const handleChange = ({ target }) => {
    const { name, value, event } = target;

    if (name === 'institution') {
      setActivity({ ...activity, [name]: value, institutionOwner: institutionsArray[event.props.index].owner });
    } else {
      setActivity({ ...activity, [name]: value });
    }
  };

  const handleDate = (moments) => {
    setActivity({ ...activity, startDate: moments[0].toString(), endDate: moments[1].toString() });
  };


  return (
    <form className="relative">
      { fetching && <Spinner /> }
      { activityFetching && <Spinner tip="Creando actividad laboral..." /> }
      <SelectField
        onChange={(value, event) => handleChange({ target: { value, name: 'institution', event } })}
        useKeys={['_id', '_id', 'name']}
        returnIndex
        value={activity.institution}
        options={institutionsArray}
        label="Instituciones" />
      <div>
        <Label>Institución propia</Label>
        {
          !disabledOwn && (
            <Checkbox
              disabled
              checked={activity.institutionOwner === user._id} />
          )
        }
      </div>
      <SelectField
        onChange={value => handleChange({ target: { value, name: 'type' } })}
        options={activitiesOptions}
        value={activity.type}
        label="Tipo de actividad" />
      {
        activity.type === 'Hospitalaria' || activity.type === 'Docente' ? (
          <TextField
            onChange={handleChange}
            name="charge"
            value={activity.charge}
            label="Cargo" />
        ) : null
      }
      {
        activity.type === 'Docente' && (
          <TextField
            onChange={handleChange}
            name="subject"
            value={activity.subject}
            label="Materia" />
        )
      }
      <RangeDatePicker
        onChange={handleDate}
        format="MM/YYYY"
        onlyMonth
        label="Periodo"
        dateOne={activity.startDate}
        dateTwo={activity.endDate} />
    </form>
  );
}

function mapStateToProps({ user, institutions, activities }) {
  return {
    fetching: institutions.fetching,
    institutionsArray: institutions.institutionsArray,
    user,
    activityFetching: activities.fetching,
  };
}

export default connect(mapStateToProps, { populateInstitutionsAction })(LaboralForm);

LaboralForm.propTypes = {
  activitiesOptions: PropTypes.arrayOf(PropTypes.string),
};

LaboralForm.defaultProps = {
  activitiesOptions: ['Hospitalaria', 'Docente', 'Sociedad'],
}
