import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ENGINE_VIBRATION_DATA } from '../../constants';

const EngineVibrationChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={ENGINE_VIBRATION_DATA}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis domain={[1, 2]} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: '#1f2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}} />
        <Line type="monotone" dataKey="vibration" name="Vibration (IPS)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EngineVibrationChart;