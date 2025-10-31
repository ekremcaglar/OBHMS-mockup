
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { SHI_TREND_DATA } from '../../constants';

const ShiTrendChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={SHI_TREND_DATA}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis domain={[70, 100]} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: '#1f2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}} />
        <Line type="monotone" dataKey="shi" name="System Health Index" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ShiTrendChart;
