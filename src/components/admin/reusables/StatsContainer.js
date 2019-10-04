import React from 'react';

function StatsContainer({ className, style, title, stats }) {
  return (
    <div className={`admin-reusables-stats-container  ${className}`} style={style}>
      <div>{ title }</div>
      <div>{ stats }</div>
    </div>
  );
}

export default StatsContainer;
