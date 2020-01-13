import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import { makePaymentAction } from '../../store/ducks/paymentsDuck';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';
import PaymentCardForm from './reusables/PaymentCardForm';
import BuyDetail from './reusables/BuyDetail';
import OxxoOrder from './reusables/OxxoOrder';
import PaymentType from './reusables/PaymentType';
import Button from '../reusables/Button';

function PaymentCourse({
  paymetFetching, userId,
  makePaymentAction,
  history, match: { params },
  membershipType,
}) {
  const { Title } = Typography;
  const { location } = history;

  const [courses, setCourses] = useState(location.state ? [...location.state] : []);
  const [amount, setAmount] = useState({});
  const [paid, setPaid] = useState({ paid: false });
  const [paymentType, setPaymentType] = useState(null);
  const [oxxoOrder, setOxxoOrder] = useState(null)
  let userCost = 'freeCost';
  if (membershipType === 'Resident') userCost = 'residentCost';
  if (membershipType === 'Socio') userCost = 'socioCost';

  useEffect(() => {
    if (courses.length === 0) history.push(`/dashboard/eventos/${params.eventId}`)
  }, [courses.length]);

  useEffect(() => {
    if (paymentType === 'oxxo') makePaymentAction({
        price: amount,
        isOxxoPayment: true 
      }, 'coursePayment')
      .then(({ conektaOrder }) => setOxxoOrder(conektaOrder));
  }, [paymentType]);


  const handleBuy = (amountData) => {
    setAmount(state => ({ ...state, ...amountData }))
  };

  const handleSubmit = (data) => {
    makePaymentAction({
        ...data,
        user: userId,
        eventId: params.eventId,
        courseIds: courses.filter(cf => cf._id).map(c => c._id) },
        'course')
      .then(paymentData => setPaid(paymentData));
  };

  if (oxxoOrder) return <OxxoOrder oxxoOrder={oxxoOrder} />

  if (!paymentType || paymentType === 'oxxo') return <PaymentType
      onChange={type => setPaymentType(type)}
      loading={paymetFetching}
    />

  return (
    <div className="dashboard-container">
      <ContainerItem className="dash-item-center">
        { paymetFetching ? <Spinner fullScrren /> : null }
        <Title>Pagar Curso</Title>
        <BuyDetail
          onAmount={handleBuy}
          details={courses.filter(cf => cf._id).map(c => ({ concept: c.title, cost: c.cost ? c.cost[userCost] : 0}))}
        />
        <PaymentCardForm
          onSubmit={handleSubmit}
          amount={amount.amount || null}
          concept={`Cursos`}
          paid={paid.paid}
        />
        { 
          paid.paid ? (
            <Link to={{ pathname: `/dashboard/pagos/${paid._id}/facturar`, state: paid }}>
              <Button width="100%" htmlType="button" marginTop="0">
                Facturar pago
              </Button>
            </Link>
          ) : null 
        }
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ course, payment: { payment }, user }) {
  return {
    courses: course.array,
    courseFetching: course.fetching,
    paymetFetching: payment.fetching,
    userId: user._id,
    membershipType: user.membershipStatus,
  };
}

export default connect(
  mapStateToProps, {
    makePaymentAction,
  }
)(PaymentCourse);
