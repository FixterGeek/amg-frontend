import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import Button from '../../reusables/Button';
import ContainerItem from '../../reusables/ContainerItem';
import BoxItem from '../../reusables/BoxItem';
import Spinner from '../../reusables/Spinner';
import PersonalEducation from '../../profile/editables/PersonalEducation';

function SignupEdicationForm({ user, education, loading, status, resetStatus }) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const { studies, internships , residences } = education;
  const allIsEmpty = (studies.length === 0 && internships.length === 0 && residences.length === 0);

  useEffect(() => {
    if (status === 'error') {
      errorAlert({});
      resetStatus();
    }
  }, [status]);

  return (
    <div style={{ position: 'relative' }}>
      {
        loading && <Spinner />
      }
      <PersonalEducation externalUser={user} />
      {
        allIsEmpty && (
          <BoxItem
            subtitle="Agrega tus datos de educacionales"
            noLeft
          />
        )
      }
      <ContainerItem>
        <Title level={3}>Educación profesional</Title>
        <ContainerItem>
          {
            studies.map(study => {
              const { major = null, institution = {}, startDate = null, endDate = null  } = study;
              const { name = null } = institution;
              const end = endDate === 'Actualidad' ? endDate : moment(endDate).format('MMMM[ de ]YYYY');

              return (
                <BoxItem
                  key={study._id}
                  title={major}
                  subtitle={name}
                  footer={`${moment(startDate).format('MMMM [ de ] YYYY')} - ${end}`}
                  noLeft
                />
              )
            })
          }
        </ContainerItem>
      </ContainerItem>

      <ContainerItem>
        <Title level={3}>Internado de pregrado</Title>
        <ContainerItem>
          {
            internships.map(inter => {
              const { institution = {}, startDate = null, endDate = null  } = inter;
              const { name = null } = institution;
              const end = endDate === 'Actualidad' ? endDate : moment(endDate).format('MMMM[ de ]YYYY');

              return (
                <BoxItem
                  key={inter._id}
                  title={name}
                  subtitle={`${moment(startDate).format('MMMM [ de ] YYYY')} - ${end}`}
                  noLeft
                />
              )
            })
          }
        </ContainerItem>
      </ContainerItem>

      <ContainerItem>
        <Title level={3}>Curso de posgrado</Title>
        <ContainerItem>
          {
            residences.map(resid => {
              const { institution = {}, startDate = null, endDate = null, speciality = null  } = resid;
              const { name = null } = institution;
              const end = endDate === 'Actualidad' ? endDate : moment(endDate).format('MMMM[ de ]YYYY');

              return (
                <BoxItem
                  key={resid._id}
                  title={speciality}
                  subtitle={name}
                  footer={`${moment(startDate).format('MMMM [ de ] YYYY')} - ${end}`}
                  noLeft
                />
              )
            })
          }
        </ContainerItem>
      </ContainerItem>

      <Button
        width="100%"
        htmlType="button"
        disabled={allIsEmpty} >
        <Link to="/signup/docentes">
          Siguiente
        </Link>
      </Button>
    </div>
  )
}

export default SignupEdicationForm;

SignupEdicationForm.propTypes = {
  education: PropTypes.object,
};

SignupEdicationForm.defaultProps = {
  education: {
    studies: [],
    internships: [],
    recidences: [],
  },
};