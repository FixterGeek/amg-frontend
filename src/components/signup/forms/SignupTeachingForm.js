import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import LaboralExperience from '../../profile/editables/LaboralExperience';
import ContainerItem from '../../reusables/ContainerItem';
import BoxItem from '../../reusables/BoxItem';
import Button from '../../reusables/Button';

function SignupTeachingForm({ activities }) {
  const { Title } = Typography;

  const {teachingActivities, hospitalActivities, medicalSocieties} = activities;
  const allIsEmpty = teachingActivities.length === 0 && hospitalActivities.length === 0 && medicalSocieties.length === 0;

  const RenderActivity = ({activity}) => {
    const {
      subject = null, charge = null, institution = {}, startDate = null, endDate = null,
    } = activity;
    const { name = null } = institution;
    const end = endDate === 'Actualidad' ? endDate : moment(endDate).format('MMMM[ de ]YYYY');

    return (
      <BoxItem
        noLeft
        title={subject || charge}
        subtitle={name}
        footer={`${moment(startDate).format('MMMM[ de ]YYYY')} - ${end}`}
      />
    );
  };

  return (
    <div>
      <LaboralExperience
        title="Actividades docentes"
      />

      <ContainerItem>
        <Title level={3}>Actividades docentes</Title>
        <ContainerItem>
          { teachingActivities.length === 0 && (
              <BoxItem noLeft subtitle="Si has participado en actividades docentes agregalas" />
            )
          }
          { teachingActivities.map(activity => <RenderActivity activity={activity} />) }
        </ContainerItem>
      </ContainerItem>

      <ContainerItem>
        <Title level={3}>Actividades hospitalarias</Title>
        <ContainerItem>
          { hospitalActivities.length === 0 && (
              <BoxItem
                noLeft
                subtitle="Si has participado en actividades hospitalarias agregalas"
              />
            )
          }
          { hospitalActivities.map(activity => <RenderActivity activity={activity} />) }
        </ContainerItem>
      </ContainerItem>

      <ContainerItem>
        <Title level={3}>Actividades en Sociedades Médicas</Title>
        <ContainerItem>
          { medicalSocieties.length === 0 && (
              <BoxItem
                noLeft
                subtitle="Si has participado en Sociedades Médicas agregalas"
              />
            )
          }
          { medicalSocieties.map(activity => <RenderActivity activity={activity} />) }
        </ContainerItem>
      </ContainerItem>
      <Button 
        width="100%"
        disabled={allIsEmpty} >
        <Link to="/signup/laborales">
          Siguiente
        </Link>
      </Button>
    </div>
  );
}

export default SignupTeachingForm;
