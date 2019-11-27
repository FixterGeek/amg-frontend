import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Icon } from 'antd';

import { getResidencesForUser } from '../../../services/residencesServices';

import useSweet from '../../../hooks/useSweetAlert';
import ContainerItem from '../../reusables/ContainerItem';
import Spinner from '../../reusables/Spinner';
import BoxItem from '../../reusables/BoxItem';
import Title from 'antd/lib/typography/Title';

function AdminUserResendences({
  userId
}) {
  const { errorAlert } = useSweet();
  const [residences, setResidnces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getResidencesForUser(userId)
        .then((data) => {
          setResidnces(data);
          setLoading(false);
        })
        .catch((error) => {
          errorAlert({});
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <ContainerItem>
      { loading && <Spinner fullScrren /> }
      {
        residences.map(r => (
          <div style={{ position: 'relative' }}>
            <BoxItem
              noLeft
              title={r.speciality}
              subtitle={r.institution.name}
              footer={
                r.endDate !== 'Actualidad'
                ? `${moment(r.startData).format('DD/MM/YY')} - ${moment(r.endDate).format('DD/MM/YY')}`
                : `${moment(r.startDate).format('DD/MM/YY')} - Actualidad`
              }
            />
            <div style={{ position: 'absolute', right: 0, marginRight: '16px', top: '16px' }}>
              {
                r.certificadoURLS[0] && (
                  <a
                    style={{
                      backgroundColor: '#022047', width: '40px', height: '40px',
                      display: 'flex', borderRadius: '50%', justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    href={r.certificadoURLS[0] || '#'}
                    target="_blank">
                    <Icon type="file-text" style={{ color: 'white', fontSize: '1.4rem' }}  /> 
                  </a>
                )
              }
            </div>
          </div>
        ))
      }
      {
        residences.length === 0 && <Title level={4}>No hay datos de residencia</Title>
      }
    </ContainerItem>
  );
}

export default AdminUserResendences;
