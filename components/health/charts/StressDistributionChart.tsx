import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../../context/I18nContext';

const MOCK_STRESS_DISTRIBUTION_DATA = [
  { name: 'Tension', value: 400 },
  { name: 'Compression', value: 300 },
  { name: 'Shear', value: 300 },
  { name: 'Torsion', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StressDistributionChart: React.FC = () => {
    const { t } = useI18n();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={MOCK_STRESS_DISTRIBUTION_DATA}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {MOCK_STRESS_DISTRIBUTION_DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(20, 20, 30, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff'
            }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StressDistributionChart;
