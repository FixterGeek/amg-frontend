import React from 'react';
import PropTypes from 'prop-types';

import { Button as Btn } from 'antd';

import { palette, size } from '../styles/theme';

function Button({
  children, bgColor, width, marginTop, marginBottom, line, ...others
}) {
  const bgColorBtn = !line ? palette[bgColor] : 'transparent';
  const borderColorBtn = palette[bgColor];
  const textColotBtn = line ? palette[bgColor] : '#f5f8f9';

  return (
    <Btn
      className="amg-button"
      style={{
        backgroundColor: bgColorBtn,
        borderColor: borderColorBtn,
        width,
        marginTop,
        marginBottom,
        color: textColotBtn,
      }}
      {...others}>
      { children }
    </Btn>
  );
}


export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  bgColor: PropTypes.oneOf(['primary', 'secondary', 'red', 'yellow']),
  width: PropTypes.oneOf(['auto', '100%']),
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  line: PropTypes.bool,
};

Button.defaultProps = {
  bgColor: 'secondary',
  width: 'auto',
  marginTop: size.largeMargin,
  marginBottom: size.largeMargin,
  line: false,
};
