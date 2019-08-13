/* eslint-disable react/no-array-index-key */
import React from 'react';

import { List } from 'antd';

function TabsList({ list }) {
  const { Item } = List;
  return (
    <List>
      {
        list.map((item) => {
          return (
            <Item>
              {
                Object.keys(item).map((key, index) => {

                  // eslint-disable-next-line no-unused-expressions
                  <span key={index}>
                    { key.text }
                  </span>
                })
              }
            </Item>
          );
        })
      }
    </List>
  );
}

export default TabsList;
