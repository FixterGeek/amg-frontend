import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import { Card } from 'antd';

import AmgButton from '../../atoms/Button';
import MembershipCardHeader from './MembershipCardHeader';

function MembershipCard({
  name, price, currency, period, points, checked, onMouseOver, onMouseOut
}) {
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <Card
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={`membership-card ${checked ? 'checked' : ''}`}
      title={
        <MembershipCardHeader name={name} price={price} currency={currency} period={period} />
      }>
      <div className="content">
        <ul className="list">
          {
            points.map(point => (
              <li key={uniqid()}>{ point }</li>
            ))
          }
        </ul>
        <div style={{ textAlign: 'center' }}>
          <AmgButton line={!checked}>Quiero ser miembro</AmgButton>
        </div>
      </div>
    </Card>
  );
}

export default MembershipCard;

MembershipCard.propTypes = {
  points: PropTypes.arrayOf(PropTypes.string),
};

MembershipCard.defaultProps = {
  points: [],
};
