/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Tabs as Tbs } from 'antd';

import DashboardContainerItem from '../../../atoms/DashboardContainerItem';

function Tabs({ headers, componentContent }) {
  console.log(headers);
  const { TabPane } = Tbs;
  return (
    <DashboardContainerItem className="reusable-tabs">
      <Tbs defaultActiveKey="0">
        {
          headers.map((header, index) => {
            return (
              <TabPane tab={header} key={`${index}`}>
                { header }
              </TabPane>
            );
          })
        }
      </Tbs>
    </DashboardContainerItem>
  );
}

export default Tabs;
