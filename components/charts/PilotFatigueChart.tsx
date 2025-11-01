import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { PILOT_FATIGUE_TREND } from '../../constants';
import { useI18n } from '../../context/I18nContext';

const PilotFatigueChart = () => {
  const { t } = useI18n();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={PILOT_FATIGUE_TREND} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="flight" name={t('flight_no')} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis domain={[0, 40]} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          contentStyle={{
            background: '#1f2937',
            borderColor: '#374151',
            borderRadius: '0.5rem',
          }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}} />
        <Bar dataKey="fatigueIndex" name={t('fatigue_index')} fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PilotFatigueChart;