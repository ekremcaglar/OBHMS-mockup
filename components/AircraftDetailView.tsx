
import React from 'react';
import { Aircraft } from '../types';
import StatusIndicator from './StatusIndicator';
import MetricCard from './MetricCard';
import Icon from './Icon';

interface AircraftDetailViewProps {
  aircraft: Aircraft;
  onBack: () => void;
}

const AircraftDetailView: React.FC<AircraftDetailViewProps> = ({ aircraft, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800">
                <Icon name="ArrowLeft" className="w-6 h-6 text-gray-300" />
            </button>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <StatusIndicator status={aircraft.status} size="lg"/>
                {aircraft.tailNumber}
            </h1>
        </div>
        <div className="flex items-center space-x-6 text-sm">
            <div>
                <span className="text-gray-400">Status: </span>
                <span className={`font-semibold ${aircraft.status === 'critical' ? 'text-red-400' : aircraft.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {aircraft.status.toUpperCase()}
                </span>
            </div>
            <div><span className="text-gray-400">Flight Hours: </span><span className="font-semibold text-white">{aircraft.flightHours}</span></div>
            <div><span className="text-gray-400">MC Rate: </span><span className="font-semibold text-white">{aircraft.missionCapableRate}%</span></div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-white mb-4">System Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aircraft.systems.map(system => (
                <div key={system.id} className={`p-4 rounded-lg border-2 ${system.status === 'critical' ? 'border-red-500 bg-red-500/10' : system.status === 'warning' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-600 bg-gray-700/30'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-white">{system.name}</h3>
                        <span className={`text-sm font-bold ${system.status === 'critical' ? 'text-red-400' : system.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}>
                            {system.status.toUpperCase()}
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{system.healthIndex}<span className="text-base font-normal text-gray-400">/100</span></div>
                    
                    {system.metrics.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-600 space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase">Key Metrics</h4>
                            {system.metrics.map(metric => (
                                <div key={metric.id} className="text-sm flex justify-between items-center" title={metric.description}>
                                    <span className="text-gray-300">{metric.title}</span>
                                    <span className={`font-semibold ${metric.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                                        {metric.value} {metric.unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftDetailView;
