import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import { Typography, Table } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import ImagePreview from '../../reusables/ImagePreview';
import StatsContainer from '../reusables/StatsContainer';

import paymentsData from './reusables/virtualPayments.json'

function AdminSubsidiary({
  user, history
}) {
  const { Title, Text } = Typography;
  const { location: historyLocation } = history;
  const [currentSub, setCurrentSub] = useState({ _id: null});
  const { basicData = {} } = currentSub;
  const { address = {} } = basicData;

  const columns = [
    { title: 'No. de referencia', dataIndex: 'reference' },
    { title: 'Concepto', dataIndex: 'concept' },
    { title: 'Monto', dataIndex: 'amount' },
    { title: 'Método de pago' },
    { title: 'Fecha', render: (t, r) =>  <span>{ moment(r.date).format('DD/MM/YYYY') }</span>}
  ];

  useEffect(() => {
    if (!currentSub._id && historyLocation.state) setCurrentSub(historyLocation.state);
  }, []);

  console.log(currentSub);

  return (
    <section className="admin-subsidiary-profile">
      <ContainerItem>
        <Title>{ address.addressName }</Title>
      </ContainerItem>
      <ContainerItem className="admin-subsidiary-profile-info">
        <div className="profile-data">
          <ImagePreview
            url={basicData.photoURL}
            containerStyle={{ borderStyle: 'none', height: '162px' }}
          />
          <div>
            <Text strong>{ basicData.name }</Text>
            <Text>{ `${address.city}, ${address.state}` }</Text>
            {
              user._id === currentSub._id && (
                <Link to={{ pathname: `/admin/filiales/${currentSub._id}/edit`, state: currentSub }}>
                  Modificar datos
                </Link>
              )
            }
          </div>
        </div>
        <div className="stats">
          <StatsContainer title="Progreso" stats="65%" />
          <StatsContainer title="Total de facturas emitidas" stats="0" />
        </div>
      </ContainerItem>
      <Title level={3}>Historial pagos</Title>
      <ContainerItem>
        <Table columns={columns} dataSource={paymentsData} rowKey="_id" />
      </ContainerItem>
    </section>
  );
}

function mapSateToProps({ user }) {
  return {
    user,
  }
}

export default connect(
  mapSateToProps
)(AdminSubsidiary);
