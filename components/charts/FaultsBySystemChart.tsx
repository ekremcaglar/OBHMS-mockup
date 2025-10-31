
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FAULTS_BY_SYSTEM } from '../../constants';

const FaultsBySystemChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={FAULTS_BY_SYSTEM} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          contentStyle={{
            background: '#1f2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FaultsBySystemChart;
