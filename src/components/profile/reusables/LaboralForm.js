import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Checkbox } from 'antd';

import { populateInstitutionsAction } from '../../../store/ducks/institutionsDuck';
import TextField from '../../../molecules/TextFields';
import RangeDatePicker from './RangeDatePicker';
import Label from '../../../atoms/data-entry/Label';
import Spinner from '../../reusables/Spinner';
import SelectField, { OptionSelect } from '../../reusables/SelectField';


function LaboralForm({
  user, institutionsArray, populateInstitutionsAction, onChange,
  lastInstitution, disabledOwn, fetching, activityFetching,
  activitiesOptions = [], defaultType, hiddenType
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
    if (defaultType) setActivity({ ...activity, type: defaultType, user: user._id });
    else setActivity({ ...activity, user: user._id })
  }, [user, defaultType]);

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

  console.log(activitiesOptions);


  return (
    <form className="relative">
      { activityFetching || fetching ?  <Spinner /> : null }
      <SelectField
        label="Institución"
        value={activity.institution}
        onChange={(value, event) => handleChange({ target: { name: 'institution', value, event } })}>
        {
          institutionsArray.map((institution, index) => (
            <OptionSelect key={institution._id} value={institution._id} index={index}>
              { institution.name }
            </OptionSelect>
          ))
        }
      </SelectField>

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
      {
        !hiddenType && (
          <SelectField
            onChange={value => handleChange({ target: { value, name: 'type' } })}
            value={activity.type}
            label="Tipo de actividad" >
              {
                activitiesOptions.map((option, index) => (
                  <OptionSelect key={index} value={option.value || option}>
                    { option.label || option }
                  </OptionSelect>
                ))
              }
          </SelectField>
        )
      }
      {
        activity.type === 'Hospitalaria' || activity.type === 'Docente' || activity.type === 'Laboral' ? (
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
  defaultType: PropTypes.string,
  hiddenType: PropTypes.bool,
};

LaboralForm.defaultProps = {
  activitiesOptions: ['Hospitalaria', 'Docente', 'Sociedad'],
  defaultType: null,
  hiddenType: false,
}
