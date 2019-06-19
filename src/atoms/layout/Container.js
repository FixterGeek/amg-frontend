import React from 'react';
import PropTypes from 'prop-types';
import { layout } from '../../styles/theme';

function Container({
  children, justifyContent, alignItems, lateralSpace, paddingTop,
  paddingBottom, flexWrap, height, width, className,
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent,
        alignItems,
        paddingRight: lateralSpace,
        paddingLeft: lateralSpace,
        paddingTop,
        paddingBottom,
        flexWrap,
        height,
        width,
      }}
    >
      { children }
    </div>
  );
}

export default Container;

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  lateralSpace: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  flexWrap: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

Container.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center',
  lateralSpace: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  flexWrap: 'wrap',
  height: '100%',
  width: '100%',
  className: '',
};
