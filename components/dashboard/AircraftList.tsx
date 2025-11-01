import React from 'react';
import { MOCK_FLEET_DATA } from '../../constants';
import StatusIndicator from '../StatusIndicator';
import { useI18n } from '../../context/I18nContext';

interface AircraftListProps {
  onAircraftSelect: (id: string) => void;
}

const AircraftList: React.FC<AircraftListProps> = ({ onAircraftSelect }) => {
  const { t } = useI18n();
  return (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 shadow-lg backdrop-blur-sm h-full flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3 px-2">{t('aircraft_status')}</h2>
        <div className="flex-grow overflow-y-auto pr-1">
            <div className="space-y-2">
                {MOCK_FLEET_DATA.aircraft.map((ac) => (
                    <div
                        key={ac.id}
                        onClick={() => onAircraftSelect(ac.id)}
                        className="grid grid-cols-12 items-center bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/80 cursor-pointer transition-colors"
                    >
                        <div className="flex items-center space-x-2 col-span-5">
                            <StatusIndicator status={ac.status} />
                            <span className="font-medium text-gray-800 dark:text-white text-sm">{ac.tailNumber}</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 col-span-4 truncate">
                            {ac.systems.filter(s => s.status !== 'nominal').map(s => s.name).join(', ') || 'Nominal'}
                        </div>
                        <div className="text-xs text-right font-semibold col-span-3">
                            {ac.aogDurationHours ? (
                                <span className="text-red-500 dark:text-red-400">AOG</span>
                            ) : (
                                <span className="text-green-600 dark:text-green-400">Ready</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AircraftList;