import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import { Typography, Table, Tabs } from 'antd';

import {
  populateSubsidiaries,
} from '../../../store/ducks/subsidiaryDuck';
import {
  getAllUsers,
} from '../../../store/ducks/users';
import ContainerItem from '../../reusables/ContainerItem';
import ImagePreview from '../../reusables/ImagePreview';
import StatsContainer from '../reusables/StatsContainer';
import UserList from '../AdminUsersList';
import SubsidiaryForm from './AdminSubsidiaryForm';
import Spinner from '../../reusables/Spinner';
import Button from '../../reusables/Button';
import SubsidiaryReceipt from './AdminSubsidiaryReceipt';
import SubsidiaryPayments from './reusables/PaymentsList';

import paymentsData from './reusables/virtualPayments.json'

function AdminSubsidiary({
  user, history, subsidiaries,
  subsidiary, noSubsidiaries,
  populateSubsidiaries,
  fetching, users, getAllUsers,
}) {
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const columns = [
    { title: 'No. de referencia', dataIndex: 'reference' },
    { title: 'Concepto', dataIndex: 'concept' },
    { title: 'Monto', dataIndex: 'amount' },
    { title: 'Método de pago' },
    { title: 'Fecha', render: (t, r) =>  <span>{ moment(r.date).format('DD/MM/YYYY') }</span>}
  ];

  const [isReceipt, setIsReceipt] = useState(false);

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
    getAllUsers();
  }, []);

  return (
    <section className="admin-subsidiary-profile">
      { fetching && <Spinner fullScrren /> }
      <ContainerItem style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Title>{ subsidiary.state }</Title>
          <Link
            to={{ pathname: `/admin/filiales/${subsidiary._id}/edit`, state: subsidiary }}>
            <Button line marginTop="0">
              Modificar datos
            </Button>
          </Link>
        </div>
        {
          user.userType === 'Filial' && (
            <Button
              style={{ marginLeft: '32px' }}
              line
              marginTop="0"
              onClick={() => setIsReceipt(s => true)}>
              Subir comprobante AMG
            </Button>
          )
        }
      </ContainerItem>
      {
        isReceipt && <SubsidiaryReceipt
            users={users}
            onCancel={v => setIsReceipt(v)}
            filial={subsidiary}
          />
      }
      {
        !isReceipt && (
          <div>
            <ContainerItem className="admin-subsidiary-profile-info">
              <div className="stats">
                <StatsContainer title="Progreso" stats="65%" />
                <StatsContainer title="Total de facturas emitidas" stats="0" />
              </div>
            </ContainerItem>
            <ContainerItem>
              <Tabs>
                <TabPane key="1" tab="Miembros">
                  <UserList
                    noEditable
                    externalData={users.map(u => ({
                      name: `${u.basicData.name} ${u.basicData.dadSurname}`,
                      speciality: u.basicData.speciality || "Gastroenterología",
                      address: 'Emérito',
                      tags: ['activa'],
                      ...u,
                      }))}
                    />
                </TabPane>
                <TabPane key="2" tab="Historial de pagos">
                  <SubsidiaryPayments subId={subsidiary._id} />
                </TabPane>
              </Tabs>
            </ContainerItem>
          </div>
        )
      }
    </section>
  );
}

function mapSateToProps({ users, user, subsidiary }, { match = {} }) {
  const { params = {} } = match;
  let subs = {}
  if (subsidiary.array[0]) subs = subsidiary.array.filter(s => s._id === params.id)[0];
  let us = []
  if (subs) us = users.array.filter(u => {
    if (u.address && u.address.state === subs.state) return true;
    if (u.basicData.address.state === subs.state) return true;
    if (u.filialAsUser === params.id) return true;
    return false;
  });
  return {
    users: us,
    user,
    subsidiaries: subsidiary.array,
    noSubsidiaries: subsidiary.noData,
    subsidiary: subsidiary.array.filter(s => s._id === params.id)[0] || {},
    fetching: user.fetching || subsidiary.fetching,
  }
}

export default connect(
  mapSateToProps, {
    populateSubsidiaries,
    getAllUsers,
  }
)(AdminSubsidiary);
