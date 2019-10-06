import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../reusables/Button';

function MembershipCard({
  points, hiddenButton, hiddenCurrency,
  membershipType, membershipCostDisplay,
  membershipCurrency, period, membershipCost,
  currentPlan, toLink,
}) {
  return (
    <div className="membership-reusables-membership-card">
      {/* Classes inside the component only work inside component */}
      <span className="type">{ membershipType }</span>
      <span className="cost">{ membershipCostDisplay }</span>
      <span className="currency">
        { !hiddenCurrency ? (
          <div>
            <span>{ membershipCurrency }</span>
            <span>{ period }</span>
          </div>
        ) : null }
      </span>
      <ul className="description">
        {
          points.map(point => (
            <li>{ point }</li>
          ))
        }
      </ul>
      <div style={{ textAlign: 'center' }}>
        {
          currentPlan && 'Plan Actual'
        }
        {
          !hiddenButton && (
            <Link
              to={{
                pathname: toLink || `/dashboard/payment/membership/${membershipType.toLowerCase()}`,
                state: { amount: membershipCost },
              }}
            >
              Quiero ser miembro
            </Link>
          )
        }
      </div>
    </div>
  );
}

export default MembershipCard;

MembershipCard.propTypes = {
  points: PropTypes.arrayOf(PropTypes.string),
  membershipType: PropTypes.string,
  membershipCostDisplay: PropTypes.string,
  membershipCurrency: PropTypes.string,
  membershipCost: PropTypes.number,
  membershipCurrency: PropTypes.string,
  perios: PropTypes.string,
};

MembershipCard.defaultProps = {
  points: [],
  membershipType: 'Free',
  membershipCostDisplay: 'Gratis' ,
  membershipCost: 0,
  membershipCurrency: 'MXN',
  period: 'anual'
};
