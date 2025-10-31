
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { Metric } from '../../types';

interface GaugeProps {
  metric: Metric;
}

const FleetAvailabilityGauge: React.FC<GaugeProps> = ({ metric }) => {
  const value = typeof metric.value === 'number' ? metric.value : parseFloat(metric.value);
  const data = [
    { name: 'Value', value: value },
    { name: 'Remaining', value: 100 - value },
  ];

  const color = value > 90 ? '#22c55e' : value > 85 ? '#facc15' : '#ef4444';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={0}
          innerRadius="60%"
          outerRadius="80%"
          dataKey="value"
          cornerRadius={5}
        >
          <Cell fill={color} />
          <Cell fill="#374151" />
           <Label
            value={`${value.toFixed(1)}%`}
            position="center"
            fill="#FFFFFF"
            className="text-2xl font-bold"
            />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FleetAvailabilityGauge;
