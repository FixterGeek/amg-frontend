import React, { useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import LaboralExperience from '../../profile/editables/LaboralExperience';
import ContainerItem from '../../reusables/ContainerItem';
import BoxItem from '../../reusables/BoxItem';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

function SignupLaboralForm({ jobActivities, loading, status, resetStatus }) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();

  useEffect(() => {
    if (status === 'error') {
      errorAlert({});
      resetStatus();
    }
    if (status === 'success') resetStatus();
  }, [status]);

  return (
    <div style={{ position: 'relative' }}>
      { loading && <Spinner fullScrren /> }
      <LaboralExperience
        title="Datos laborales"
        activitiesOptions={['Laboral']}
        defaultType="Laboral"
        hiddenType
      />

      <ContainerItem>
        {
          jobActivities.length === 0 && (
            <BoxItem noLeft subtitle="Agrega tus datos laborales." />
          )
        }
        {
          jobActivities.map(activity => {
            const { charge = null, institution = {}, startDate = null, endDate = null } = activity;
            const { name = null } = institution;
            const end = endDate === 'Actualidad' ? endDate : `${moment(endDate).format('MMMM[ de ]YYYY')}`;

            return (
              <BoxItem
                key={activity._id}
                noLeft
                title={charge}
                subtitle={name}
                footer={`${moment(startDate).format('MMMM[ de ]YYYY')} - ${end}`}
              />
            )
          })
        }
      </ContainerItem>
      <Button width="100%">
        <Link to="/signup/fiscales">
          Siguiente
        </Link>
      </Button>
    </div>
  );
}

export default SignupLaboralForm;

SignupLaboralForm.propTypes = {
  jobActivities: PropTypes.array,
};

SignupLaboralForm.defaultProps = {
  jobActivities: [],
};
