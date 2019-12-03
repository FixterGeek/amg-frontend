import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Typography, Modal } from 'antd';

import { pushLastInstitution } from '../../../store/ducks/institutionsDuck';
import { createActivityAction } from '../../../store/ducks/activitiesDuck';
import ContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import CreateInstitution from '../reusables/CreateInstitutionModal';
import LaboralForm from '../reusables/LaboralForm';

function LaboralExperience({
  user, createActivityAction,
  title, activitiesOptions, defaultType,
  hiddenType, status,
}) {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState();
  const [lastInstitution, setLastInstitution] = useState();

  const handleResult = (error, data) => {
    if (data) {
      setLastInstitution(data._id);
    }
  };

  const handleForm = (data) => {
    setActivity(data);
  };

  const handleSave = () => {
    createActivityAction(activity);
    setOpen(false);
  };

  return (
    <ContainerItem className="component-profile-laboral-experience">
      <div className="component-profile-laboral-experience-header">
        <Title>{ title }</Title>
        <LaboralForm
          lastInstitution={lastInstitution}
          onChange={handleForm}
          activitiesOptions={activitiesOptions}
          defaultType={defaultType}
          hiddenType={hiddenType}
          status={status}
          institutionComponent={
            <CreateInstitution user={user} onResult={handleResult} />
          }
          onSave={handleSave}
        />
      </div>
    </ContainerItem>
  );
}

function mapStateToProps({ activities, user }) {
  return {
    status: activities.status,
    user
  };
}

export default connect(
  mapStateToProps, { createActivityAction, pushLastInstitution },
)(LaboralExperience);

LaboralExperience.propTypes = {
  title: PropTypes.string,
  activitiesOptions: PropTypes.arrayOf(PropTypes.string),
  defaultType: PropTypes.string,
  hiddenType: PropTypes.bool,
};

LaboralExperience.defaultProps = {
  title: 'Experiencia profesional',
  activitiesOptions: ['Hospitalaria', 'Docente', 'Sociedad'],
  defaultType: null,
  hiddenType: false,
};
