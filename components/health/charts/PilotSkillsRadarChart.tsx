import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PILOT_SKILLS_DATA } from '../../../constants';
import { useI18n } from '../../../context/I18nContext';

const PilotSkillsRadarChart: React.FC = () => {
    const { t } = useI18n();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PILOT_SKILLS_DATA}>
        <PolarGrid stroke="#4b5563" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
        <Tooltip
            contentStyle={{
                background: '#1f2937',
                borderColor: '#374151',
                borderRadius: '0.5rem',
            }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}} />
        <Radar name="Pilot" dataKey="pilot" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Squadron Avg." dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PilotSkillsRadarChart;