import React, { Fragment } from 'react';

import { Tag } from 'antd';

function PaymentStatus({ paidout }) {
  return (
    <Fragment>
      {
        paidout ? (
          <Tag color="green">PAGADO</Tag>
        ) : (
          <Tag color="volcano">SIN PAGO</Tag>
        )
      }
    </Fragment>
  );
}

export default PaymentStatus;
