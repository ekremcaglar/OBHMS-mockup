import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AIRFRAME_STRESS_DATA } from '../../../constants';

const AirframeStressChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={AIRFRAME_STRESS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="fh" name="Flight Hours" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          contentStyle={{
            background: '#1f2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
        />
        <Bar dataKey="events" name="High-G Events" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AirframeStressChart;