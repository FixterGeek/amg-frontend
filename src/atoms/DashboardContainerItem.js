import React from 'react';
import PropTypes from 'prop-types';

function DashboardContainerItem({ children, style, className }) {
  return (
    <div className={`dashboard-container-item ${className}`} style={{ ...style }}>
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
  className: PropTypes.string,
};

DashboardContainerItem.defaultProps = {
  style: {},
  className: '',
};
