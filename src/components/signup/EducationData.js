import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import moment from 'moment';

import { Typography, Icon } from 'antd';

import { populateEducationAction } from '../../store/ducks/educationDuck';
import Container from '../../atoms/layout/Container';
import Gastro from '../../atoms/gastro/Gastro';
import Steper from '../../organisms/Steper';
import Button from '../../atoms/Button';
import BoxItem from '../../atoms/BoxItem';
import PersonalEducation from '../../components/profile/editables/PersonalEducation';
import Spinner from '../../atoms/Spinner';

import ContainerItem from '../../atoms/DashboardContainerItem';
import { signUpUser } from '../../store/ducks/signupDuck';

const EducationData = ({
  signup, studies, internships, residences, populateEducationAction,
}) => {
  const { Title } = Typography;

  useEffect(() => {
    populateEducationAction();
  }, [])

  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <Gastro />
        <Steper />
      </div>

      <div className="signup-container-rigth">

      <PersonalEducation externalUser={signup}/>
      <ContainerItem className="relative">
        <ContainerItem>
          <Title level={3}>Estudios</Title>
        </ContainerItem>
        {
          studies.map(study => (
            <BoxItem
              title={study.major || study.institution.name}
              level1={study.institution.name}
              level2={
                `${moment(study.startDate).format('YYY')} - ${moment(study.endDate).format('YYYY')}`
            } />
          ))
        }

        <ContainerItem>
          <Title level={3}>Internados</Title>
        </ContainerItem>
        {
          internships.map(internship => (
            <BoxItem
              title={internship.institution.name}
              level1={internship.institution.name}
              level2={
                `${moment(internship.startDate).format('YYY')} - ${moment(internship.endDate).format('YYYY')}`
            } />
          ))
        }

        <ContainerItem>
          <Title level={3}>Residencias</Title>
        </ContainerItem>
        {
          residences.map(residence => (
            <BoxItem
              title={residence.speciality || residence.institution.name}
              level1={residence.institution.name}
              level2={
                `${moment(residence.startDate).format('YYY')} - ${moment(residence.endDate).format('YYYY')}`
            } />
          ))
        }
      </ContainerItem>

        <Button
          width="100%"
          disabled={!(studies.length > 0 || residences.length > 0 || internships.length > 0)}>
          <Link to="/signup/laboral">Siguiente</Link>
        </Button>
      </div>
    </div>
  );
};

function mapState({ signup, education }) {
  return {
    signup,
    studies: education.studies,
    internships: education.internships,
    residences: education.residences,
  };
}

export default connect(mapState, { populateEducationAction })(EducationData);
