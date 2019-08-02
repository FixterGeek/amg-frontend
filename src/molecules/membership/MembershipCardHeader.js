import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

// eslint-disable-next-line object-curly-newline
function CardHeader({ name, price, currency, period }) {
  const { Title, Text } = Typography;

  return (
    <div className="membership-card-header">
      <div>
        <Text className="name">{ name }</Text>
      </div>
      <div>
        <Title level={2} className="price">{ price }</Title>
      </div>
      <div>
        <Text className="currency">{ currency }</Text>
      </div>
      <div className="period">
        <Text className="period">{ period }</Text>
      </div>
    </div>
  );
}

export default CardHeader;

CardHeader.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  currency: PropTypes.string,
  period: PropTypes.string,
};

CardHeader.defaultProps = {
  name: 'Membership name',
  price: '$000',
  currency: 'MXN',
  period: '',
};
