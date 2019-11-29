import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { createEducationAction } from '../../../store/ducks/educationDuck';
import DashboardContainerItem from '../../../atoms/DashboardContainerItem';
import EducationForm from '../reusables/EducationForm';

function PersonalEducation({
  user, externalUser = null, createEducationAction,
  status,
}) {
  const { Title } = Typography;

  const [education, setEducation] = useState();

  const handleSave = () => {
    if (education.type === 'Estudios') createEducationAction('studies', education);
    if (education.type === 'Residencia') createEducationAction('residences', education);
    if (education.type === 'Internado') createEducationAction('internships', education);
  };

  const handleEducationForm = (data) => {
    setEducation(data);
  }

  return (
    <DashboardContainerItem className="component-profile-personal-education">
      <div className="component-profile-personal-education-header">
        <Title>Educación</Title>
        <EducationForm
          user={externalUser || user}
          onChange={handleEducationForm}
          onSave={handleSave}
          status={status}
        />
      </div>
    </DashboardContainerItem>
  );
}

function mapStateToProps({ user, education }) {
  return { 
    user,
    status: education.status,
  };
}

export default connect(mapStateToProps, { createEducationAction })(PersonalEducation);
