import React from 'react';
import Icon from './Icon';
import { Metric } from '../types';

interface MetricCardProps {
  metric: Metric;
  children?: React.ReactNode;
}

const TrendIcon: React.FC<{ trend?: 'up' | 'down' | 'stable' }> = ({ trend }) => {
  if (!trend) return null;
  const trendInfo = {
    up: { icon: 'ArrowUp', color: 'text-green-500' },
    down: { icon: 'ArrowDown', color: 'text-red-500' },
    stable: { icon: 'Minus', color: 'text-gray-400' },
  };
  const { icon, color } = trendInfo[trend];
  return <Icon name={icon} className={`w-5 h-5 ${color}`} />;
};

const MetricCard: React.FC<MetricCardProps> = ({ metric, children }) => {
  const statusColors = {
    nominal: 'border-green-500/30',
    warning: 'border-yellow-400/30',
    critical: 'border-red-500/30',
  };

  return (
    <div className={`bg-gray-800/50 border ${statusColors[metric.status]} rounded-xl p-4 flex flex-col shadow-lg backdrop-blur-sm`}>
      <div className="flex items-center justify-between text-gray-400 text-sm">
        <span>{metric.title}</span>
        <div className="w-5 h-5 cursor-pointer" title={metric.description}>
          <Icon name="Info" className="w-full h-full" />
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center my-2">
        {children ? (
          <div className="w-full h-full">{children}</div>
        ) : (
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-bold text-white">{metric.value}</p>
            {metric.unit && <span className="text-lg text-gray-400">{metric.unit}</span>}
            <TrendIcon trend={metric.trend} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;