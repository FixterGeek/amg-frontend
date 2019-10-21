import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography, List } from 'antd';

import {
  updateUserAction,
  resetUserStatus,
} from '../../store/ducks/userDuck';
import {
  makePaymentInvoiceAction,
  resetPaymentStatus,
} from '../../store/ducks/paymentsDuck';
import ContainerItem from '../reusables/ContainerItem';
import JustModal from '../admin/reusables/JustMoadal';
import FiscalForm from '../signup/forms/SignupFiscalForm';
import Button from '../reusables/Button';
import Spinner from '../reusables/Spinner';

function MembershipInvoice({
  history, user, fiscalData,
  updateUserAction, userFetching, userStatus,
  resetUserStatus, makePaymentInvoiceAction, resetPaymentStatus,
  paymentFetching
}) {
  const { Title, Text } = Typography;
  const { Item } = List;
  const { location } = history;

  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    if (!paymentData._id) setPaymentData(location.state || {});
  }, [])

  
  const handleInvoice = () => {
    makePaymentInvoiceAction(paymentData._id);
  };

  console.log(paymentFetching);

  return (
    <div className="dashboard-container">
      { paymentFetching && <Spinner fullScrren /> }
      <Title>Facturar</Title>
      <ContainerItem>
        <List>
          <Item>
            <Text strong>{`Concepto: `}</Text>
            { paymentData.concept }
          </Item>
          <Item>
            <Text strong>{`Monto: `}</Text>
            { paymentData.amount }
          </Item>
          <Item>
            <Text strong>{`Fecha: `}</Text>
            { moment(paymentData.date).format('DD/MM/YYYY') }
          </Item>
          <Item>
            <Text strong>{`Tipo de pago: `}</Text>
            { paymentData.paymentType }
          </Item>
          <Item>
            <Text strong>{`RFC: `}</Text>
            { fiscalData.rfc }
          </Item>
          <Item>
            <Text strong>{`Dirección: `}</Text>
            { fiscalData.address.street }
          </Item>
          <Item>
            <Text strong>{`Colonia: `}</Text>
            { fiscalData.address.colony }
          </Item>
          <Item>
            <Text strong>{`Código postal: `}</Text>
            { fiscalData.address.zipCode }
          </Item>
          <Item>
            <Text strong>{`Ciudad: `}</Text>
            { fiscalData.address.city }
          </Item>
          <Item>
            <Text strong>{`Estado: `}</Text>
            { fiscalData.address.state }
          </Item>
        </List>
        <JustModal
          openComponent={<a>Modificar datos fiscales</a>}
          childElement={
            <FiscalForm
              user={user}
              dispatch={updateUserAction}
              resetStatus={resetUserStatus}
              loading={userFetching}
              status={userStatus}
              history={history}
              noTerms
              noRedirect
            />
          }
          close={userStatus !== 'success'}
        />
      </ContainerItem>
      <Button width="100%" htmlType="button" onClick={() => handleInvoice()}>
        Generar Factura
      </Button>
    </div>
  );
}

function mapSateToProps({ user, payment: { payment } }) {
  return {
    user,
    fiscalData: user.fiscalData,
    userFetching: user.fetching,
    userStatus: user.status,
    paymentFetching: payment.fetching,
    paymentStatus: payment.status,
  }
}

export default connect(
  mapSateToProps, {
    updateUserAction,
    resetUserStatus,
    makePaymentInvoiceAction,
    resetPaymentStatus,
  }
)(MembershipInvoice);
