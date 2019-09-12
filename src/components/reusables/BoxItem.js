/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import ImagePreview from './ImagePreview';

function BoxItem({
  title, subtitle, footer,
  noLeft, leftContent, leftIsImage,
  leftStyle, infoStyle, to, linkState
}) {
  const { Title, Text } = Typography;

  const LinkFactory = () => {
    if (to) return (
      <Link
        to={{ pathname: to, state: linkState }}
        style={{ minWidth: 0, flexGrow: 1 }}>
        <div className="reusables-box-item-info" style={infoStyle}>
          <Title level={3} > { title } </Title>
          <Text> { subtitle } </Text>
          <Text> { footer } </Text>
        </div>
      </Link>
    );

    return (
      <div className="reusables-box-item-info" style={infoStyle}>
        <Title level={3} > { title } </Title>
        <Text> { subtitle } </Text>
        <Text> { footer } </Text>
      </div>
    );
  };

  return (
    <div className="reusables-box-item">
      {
        !noLeft && (
          <div className="reusables-box-item-left" style={leftStyle}>
            {
              leftIsImage ? (
                <ImagePreview
                  containerStyle={{
                    maxWidth: '120px', maxHeight: '120px', borderStyle: 'none',
                    width: '120px', height: '120px',
                  }}
                />
              ) : (
                <Title level={3}> { leftContent } </Title>
              )
            }
          </div>
        )
      }
      <LinkFactory />
    </div>
  )
}

export default BoxItem;

BoxItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footer: PropTypes.string,
  noLeft: PropTypes.bool,
  leftContent: PropTypes.node,
  leftIsImage: PropTypes.bool,
  leftStyle: PropTypes.object,
  infoStyle: PropTypes.object,
  to: PropTypes.string,
  linkState: PropTypes.object,
};

BoxItem.defaultProps = {
  title: null,
  subtitle: null,
  footer: null,
  noLeft: false,
  leftContent: null,
  leftIsImage: false,
  leftStyle: null,
  infoStyle: null,
  to: null,
  linkState: null,
};
