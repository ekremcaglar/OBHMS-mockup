import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../../context/I18nContext';

const MOCK_CRACK_PROPAGATION_DATA = [
  { flightHours: 100, crackLength: 0.1, component: 'Wing Root' },
  { flightHours: 200, crackLength: 0.12, component: 'Wing Root' },
  { flightHours: 300, crackLength: 0.15, component: 'Wing Root' },
  { flightHours: 400, crackLength: 0.18, component: 'Wing Root' },
  { flightHours: 500, crackLength: 0.22, component: 'Wing Root' },
  { flightHours: 600, crackLength: 0.27, component: 'Wing Root' },
  { flightHours: 700, crackLength: 0.35, component: 'Wing Root' },
];

const CrackPropagationChart: React.FC = () => {
    const { t } = useI18n();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={MOCK_CRACK_PROPAGATION_DATA}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="flightHours" />
        <YAxis />
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(20, 20, 30, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff'
            }}
        />
        <Legend />
        <Line type="monotone" dataKey="crackLength" stroke="#8884d8" name={t('crack_length_mm')} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CrackPropagationChart;
