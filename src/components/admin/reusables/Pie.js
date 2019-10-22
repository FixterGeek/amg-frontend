import React from 'react';

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

function PieStat({ data = [] }) {
  const PieColors = ['#022047', '#fa6400'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={260} height={260}>
      <Pie
        data={data}
        dataKey="stat"
        isAnimationActive={false}
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {
          data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={PieColors[index]} />
          ))
        }
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieStat;
