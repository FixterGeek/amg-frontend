/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { Tabs as Tbs } from 'antd';

import DashboardContainerItem from '../../../atoms/DashboardContainerItem';

function Tabs({ headers, componentContent }) {
  const { TabPane } = Tbs;
  return (
    <DashboardContainerItem className="reusable-tabs">
      <Tbs defaultActiveKey="0">
        {
          headers.map((header, index) => {
            return (
              <TabPane tab={header} key={`${index}`}>
                { componentContent[index] }
              </TabPane>
            );
          })
        }
      </Tbs>
    </DashboardContainerItem>
  );
}

export default Tabs;

Tabs.propTypes = {
  componentContent: PropTypes.node,
};

Tabs.defaultProps = {
  componentContent: [],
};
