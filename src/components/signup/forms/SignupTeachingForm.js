import React, { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import LaboralExperience from '../../profile/editables/LaboralExperience';
import ContainerItem from '../../reusables/ContainerItem';
import BoxItem from '../../reusables/BoxItem';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';


function SignupTeachingForm({ activities, loading, status, resetStatus }) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const {teachingActivities, hospitalActivities, medicalSocieties} = activities;
  const allIsEmpty = teachingActivities.length === 0 && hospitalActivities.length === 0 && medicalSocieties.length === 0;

  useEffect(() => {
    if (status === 'error') {
      errorAlert({});
      resetStatus();
    }
    if (status === 'success') resetStatus();
  }, [status])

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
    <div style={{ position: 'relative' }}>
      { loading && <Spinner fullScrren /> }

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
          { teachingActivities.map(activity => <RenderActivity key={activity._id} activity={activity} />) }
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
          { hospitalActivities.map(activity => <RenderActivity key={activity._id} activity={activity} />) }
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
          { medicalSocieties.map(activity => <RenderActivity key={activity._id} activity={activity} />) }
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
