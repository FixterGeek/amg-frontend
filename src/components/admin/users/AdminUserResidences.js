import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { getResidencesForUser } from '../../../services/residencesServices';

import useSweet from '../../../hooks/useSweetAlert';
import ContainerItem from '../../reusables/ContainerItem';
import Spinner from '../../reusables/Spinner';
import BoxItem from '../../reusables/BoxItem';
import Button from '../../reusables/Button';
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
          <div>
            <BoxItem
              noLeft
              title={r.speciality}
              subtitle={r.institution}
              footer={
                r.endDate !== 'Actualidad'
                ? `${moment(r.startData).format('DD/MM/YY')} - ${moment(r.endDate).format('DD/MM/YY')}`
                : `${moment(r.startDate).format('DD/MM/YY')} - Actualidad`
              }
            />
            <div>
              <a href={r.certificadoURLS[0] || '#'} target="_blank">
                <Button width="100%" disabled={!r.certificadoURLS[0]}>
                  { r.certificadoURLS[0] ? 'Ver certificado' : 'No hay certificado' }
                </Button>
              </a>
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
