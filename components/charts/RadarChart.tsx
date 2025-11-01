import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RADAR_CHART_DATA } from '../../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 p-3 rounded-md border border-gray-700 text-sm">
        <p className="font-bold text-white mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>{`${p.name}: ${p.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const SystemHealthRadarChart = () => {
    const aircraftColors = {
        'KAAN-001': '#8884d8',
        'KAAN-002': '#ef4444',
        'KAAN-003': '#f59e0b',
        'KAAN-004': '#22c55e',
    };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_CHART_DATA}>
        <PolarGrid stroke="#4b5563" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{fontSize: "12px"}} />
        {Object.entries(aircraftColors).map(([tailNumber, color]) => (
            <Radar key={tailNumber} name={tailNumber} dataKey={tailNumber} stroke={color} fill={color} fillOpacity={0.2} />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SystemHealthRadarChart;