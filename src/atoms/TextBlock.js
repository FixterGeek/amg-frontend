import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

function TextBlock({ title, text }) {
  const { Title, Text } = Typography;

  console.log(text);

  return (
    <div className="text-block">
      <Title level={2}>{ title }</Title>
      <div>
        <Text>
          { text }
        </Text>
      </div>
    </div>
  );
}

export default TextBlock;

TextBlock.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
