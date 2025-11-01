import React from 'react';
import { MOCK_FLEET_DATA } from '../../constants';
import StatusIndicator from '../StatusIndicator';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';

interface WatchlistAircraftProps {
  onAircraftSelect: (id: string) => void;
}

const WatchlistAircraft: React.FC<WatchlistAircraftProps> = ({ onAircraftSelect }) => {
  const { t } = useI18n();
  const watchlistAircraft = MOCK_FLEET_DATA.aircraft.filter(
    ac => ac.status === 'critical' || ac.status === 'warning'
  ).sort((a) => (a.status === 'critical' ? -1 : 1)); // Show critical first

  if (watchlistAircraft.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm text-center h-full flex items-center justify-center">
        <p className="text-gray-400">{t('all_aircraft_nominal')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {watchlistAircraft.map(ac => {
        const criticalSystem = ac.systems.find(s => s.status !== 'nominal');
        const keyMetric = criticalSystem?.metrics[0];

        return (
          <div
            key={ac.id}
            onClick={() => onAircraftSelect(ac.id)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 shadow-lg backdrop-blur-sm hover:bg-gray-700/50 hover:border-sky-500 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <StatusIndicator status={ac.status} size="lg" />
                <span className="font-bold text-lg text-white">{ac.tailNumber}</span>
                <span className="text-sm text-gray-400">({ac.squadron})</span>
              </div>
              <div className="text-sm font-semibold capitalize">
                <span className={ac.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}>
                  {ac.status}
                </span>
              </div>
            </div>
            <div className="mt-3 pl-6 border-l-2 border-gray-700 ml-1.5 space-y-2">
                {criticalSystem && (
                     <div className="flex items-center text-sm">
                        <Icon name="AlertTriangle" className={`w-4 h-4 mr-2 flex-shrink-0 ${ac.status === 'critical' ? 'text-red-400' : 'text-yellow-400'}`} />
                        <span className="text-gray-400 mr-2">{t('primary_alert')}:</span>
                        <span className="font-semibold text-white">{criticalSystem.name}</span>
                    </div>
                )}
                {keyMetric && (
                     <div className="flex items-center text-sm">
                        <Icon name="TrendingUp" className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-400 mr-2">{t('key_metric')}:</span>
                        <span className="font-semibold text-white">{keyMetric.title} - {keyMetric.value}{keyMetric.unit}</span>
                    </div>
                )}
                 {!criticalSystem && (
                     <div className="flex items-center text-sm">
                        <Icon name="Info" className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-400 mr-2">Status:</span>
                        <span className="font-semibold text-white">General Warning</span>
                    </div>
                 )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WatchlistAircraft;