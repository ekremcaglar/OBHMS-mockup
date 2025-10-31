
import React, { useState, useCallback } from 'react';
import { MOCK_FLEET_DATA } from '../constants';
import MetricCard from './MetricCard';
import FleetAvailabilityGauge from './charts/FleetAvailabilityGauge';
import FaultsBySystemChart from './charts/FaultsBySystemChart';
import ShiTrendChart from './charts/ShiTrendChart';
import StatusIndicator from './StatusIndicator';
import { generateFleetHealthSummary } from '../services/geminiService';
import Icon from './Icon';

interface FleetOverviewProps {
  onAircraftSelect: (id: string) => void;
}

const FleetOverview: React.FC<FleetOverviewProps> = ({ onAircraftSelect }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);

  const handleGenerateSummary = useCallback(() => {
    setIsLoadingSummary(true);
    generateFleetHealthSummary(MOCK_FLEET_DATA)
      .then(setSummary)
      .finally(() => setIsLoadingSummary(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard metric={MOCK_FLEET_DATA.missionCapableRate} />
        <MetricCard metric={MOCK_FLEET_DATA.fleetAvailability}>
            <FleetAvailabilityGauge metric={MOCK_FLEET_DATA.fleetAvailability} />
        </MetricCard>
        <MetricCard metric={MOCK_FLEET_DATA.nffRate} />
        <MetricCard metric={MOCK_FLEET_DATA.aogEvents} />
        <MetricCard metric={MOCK_FLEET_DATA.rulExpirationForecast} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">Aircraft Status</h2>
          <div className="space-y-3">
            {MOCK_FLEET_DATA.aircraft.map((ac) => (
              <div
                key={ac.id}
                onClick={() => onAircraftSelect(ac.id)}
                className="grid grid-cols-5 items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700/80 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3 col-span-2">
                  <StatusIndicator status={ac.status} />
                  <span className="font-medium text-white">{ac.tailNumber}</span>
                </div>
                <div className="text-sm text-gray-400">
                    <span className="font-bold text-white">{ac.missionCapableRate}%</span> MC Rate
                </div>
                <div className="text-sm text-gray-400">
                    <span className="font-bold text-white">{ac.flightHours}</span> FH
                </div>
                <div className="text-sm text-right font-semibold">
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
        <div className="flex flex-col gap-6">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex-1 flex flex-col shadow-lg backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-2">AI Health Summary</h2>
            {summary ? (
              <div className="text-sm text-gray-300 space-y-2 prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br/>') }}/>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <button
                  onClick={handleGenerateSummary}
                  disabled={isLoadingSummary}
                  className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600"
                >
                  {isLoadingSummary ? (
                    <Icon name="LoaderCircle" className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon name="Sparkles" className="w-5 h-5" />
                  )}
                  <span>{isLoadingSummary ? 'Generating...' : 'Generate Summary'}</span>
                </button>
              </div>
            )}
          </div>
          <MetricCard metric={{ id: 'fbs', title: 'Top 5 Grounding Faults', value: '', unit: '', status: 'nominal', description: 'Count of faults by system leading to grounding events.' }}>
              <FaultsBySystemChart />
          </MetricCard>
        </div>
      </div>
      <div className="grid grid-cols-1">
         <MetricCard metric={{ id: 'shitrend', title: 'Fleet System Health Index (SHI) Trend', value: '', unit: '', status: 'warning', description: 'Average health index across all aircraft systems over the last 10 weeks.' }}>
              <div className="h-64">
                <ShiTrendChart />
              </div>
          </MetricCard>
      </div>
    </div>
  );
};

export default FleetOverview;
