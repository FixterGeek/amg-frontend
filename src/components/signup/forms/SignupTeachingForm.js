import React from 'react';

import { Typography } from 'antd';

import LaboralExperience from '../../profile/editables/LaboralExperience';
import ContainerItem from '../../reusables/ContainerItem';
import BoxItem from '../../reusables/BoxItem';

function SignupTeachingForm({ activities }) {
  const { Title } = Typography;

  const {teachingActivities, hospitalActivities, medicalSocieties} = activities;

  return (
    <div>
      <LaboralExperience
        title="Actividades docentes"
      />

      <ContainerItem>
        <Title level={3}>Actividades docentes</Title>
        <ContainerItem>
          {
            teachingActivities.length === 0 && (
              <BoxItem
                noLeft
                subtitle="Si has participado en actividades docentes agregalas"
              />
            )
          }
        </ContainerItem>
      </ContainerItem>

      <ContainerItem>
        <Title level={3}>Actividades hospitalarias</Title>
        <ContainerItem>
          {
            hospitalActivities.length === 0 && (
              <BoxItem
                noLeft
                subtitle="Si has participado en actividades hospitalarias agregalas"
              />
            )
          }
        </ContainerItem>
      </ContainerItem>

      <ContainerItem>
        <Title level={3}>Actividades en Sociedades Médicas</Title>
        <ContainerItem>
          {
            medicalSocieties.length === 0 && (
              <BoxItem
                noLeft
                subtitle="Si has participado en Sociedades Médicas agregalas"
              />
            )
          }
        </ContainerItem>
      </ContainerItem>
    </div>
  );
}

export default SignupTeachingForm;
