import React from 'react';

import { Typography } from 'antd';
import ImagePreview from './ImagePreview';

function BoxItem({
  title, subtitle, footer, noLeft, leftContent, leftIsImage
}) {
  const { Title, Text } = Typography;

  return (
    <div className="reusables-box-item">
      {
        !noLeft && (
          <div className="reusables-box-item-left">
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
      <div className="reusables-box-item-info">
        <Title level={3} > { title } </Title>
        <Text> { subtitle } </Text>
        <Text> { footer } </Text>
      </div>
    </div>
  )
}

export default BoxItem;
