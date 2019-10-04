import React from 'react';
import { Typography } from 'antd';

function MembersBlock({
  year, members, advice
}) {
  const { Title } = Typography;
  return (
    <div className="home-reusables-members-block">
      <Title level={3}>{ year }</Title>
      {
        members && members.map(member => (
          <div className="home-reusables-members-block-item-position">
            <span>{ member.name }</span>
            <span>{ member.position }</span>
          </div>
        ))
      }
      {
        advice && <Title level={4}>Consejo consultivo</Title>
      }
      {
        advice && advice.map(item => (
          <div className="home-reusables-members-block-item">
            <span>{ item }</span>
          </div>
        ))
      }
    </div>
  );
}

export default MembersBlock;
