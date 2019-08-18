import React from 'react';

import { Typography } from 'antd';

import ContainerItem from '../../../atoms/DashboardContainerItem';

function ModalAndList({
  modal, subtitle = null , iterable, titlesKeys,
  level1Keys, level2Keys,
}) {
  const { Title } = Typography;
  return (
    <ContainerItem>
      { modal }
      <ContainerItem className="relative">
        { subtitle && (
          <ContainerItem>
            <Title>{ subtitle }</Title>
          </ContainerItem>
        ) }

        {
          iterable.map(item => (
            <BoxItem
              title={titlesKeys}
              level1={titlesKeys}
              level2={
                `${moment(titlesKeys).format('YYY')} - ${moment(titlesKeys).format('YYYY')}`
            } />
          ))
        }
      </ContainerItem>
    </ContainerItem>
  );
}

export default ModalAndList;
