
import React from 'react';
import { MOCK_FLEET_DATA } from '../constants';
import StatusIndicator from './StatusIndicator';

interface FleetOverviewProps {
  onAircraftSelect: (id: string) => void;
}

const FleetOverview: React.FC<FleetOverviewProps> = ({ onAircraftSelect }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white mb-4">Aircraft Fleet Status</h2>
        <div className="grid grid-cols-12 items-center px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="col-span-3">Tail Number</div>
            <div className="col-span-2">MC Rate</div>
            <div className="col-span-2">Flight Hours</div>
            <div className="col-span-3">Critical Systems</div>
            <div className="col-span-2 text-right">Status</div>
        </div>
        <div className="space-y-3">
            {MOCK_FLEET_DATA.aircraft.map((ac) => (
                <div
                key={ac.id}
                onClick={() => onAircraftSelect(ac.id)}
                className="grid grid-cols-12 items-center bg-gray-900/50 p-3 rounded-lg hover:bg-gray-700/80 cursor-pointer transition-colors"
                >
                <div className="flex items-center space-x-3 col-span-3">
                    <StatusIndicator status={ac.status} />
                    <span className="font-medium text-white">{ac.tailNumber}</span>
                </div>
                <div className="text-sm text-gray-400 col-span-2">
                    <span className="font-bold text-white">{ac.missionCapableRate}%</span>
                </div>
                <div className="text-sm text-gray-400 col-span-2">
                    <span className="font-bold text-white">{ac.flightHours}</span>
                </div>
                 <div className="text-sm text-gray-400 col-span-3">
                    {ac.systems.filter(s => s.status !== 'nominal').map(s => s.name).join(', ') || 'Nominal'}
                </div>
                <div className="text-sm text-right font-semibold col-span-2">
                    {ac.aogDurationHours ? (
                        <span className="text-red-400">AOG: {ac.aogDurationHours}h</span>
                    ) : (
                        <span className="text-green-400">Ready</span>
                    )}
                </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default FleetOverview;
