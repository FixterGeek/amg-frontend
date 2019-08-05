import React from 'react';
import PropTypes from 'prop-types';

function DashboardContainerItem({ children, style }) {
  return (
    <div className="dashboard-container-item" style={{ ...style }}>
      { children }
    </div>
  );
}

export default DashboardContainerItem;

DashboardContainerItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.node])),
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
};

DashboardContainerItem.defaultProps = {
  style: {},
};
