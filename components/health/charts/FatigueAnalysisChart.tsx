import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../../context/I18nContext';

const MOCK_FATIGUE_ANALYSIS_DATA = [
  { component: 'Fuselage', safeLifeUsed: 65, designLife: 100 },
  { component: 'Wing Box', safeLifeUsed: 45, designLife: 100 },
  { component: 'Empennage', safeLifeUsed: 55, designLife: 100 },
  { component: 'Landing Gear', safeLifeUsed: 70, designLife: 100 },
];

const FatigueAnalysisChart: React.FC = () => {
  const { t } = useI18n();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={MOCK_FATIGUE_ANALYSIS_DATA}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="component" />
        <YAxis />
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(20, 20, 30, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff'
            }}
        />
        <Legend />
        <Bar dataKey="safeLifeUsed" fill="#82ca9d" name={t('safe_life_used')} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FatigueAnalysisChart;
