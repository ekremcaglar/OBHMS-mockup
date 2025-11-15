import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MOCK_CROSS_AIRCRAFT_ANOMALY_DATA } from '../../constants';
import Icon from '../Icon';

const CrossAircraftAnomalyCorrelation: React.FC = () => {
    const { t } = useI18n();
    const [expandedAnomalyId, setExpandedAnomalyId] = useState<string | null>(MOCK_CROSS_AIRCRAFT_ANOMALY_DATA[0].anomalyId);

    const toggleExpand = (anomalyId: string) => {
        setExpandedAnomalyId(expandedAnomalyId === anomalyId ? null : anomalyId);
    };

    const getSystemColor = (system: string) => {
        switch (system) {
            case 'Hydraulics': return 'bg-blue-500';
            case 'Propulsion': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4">
            {MOCK_CROSS_AIRCRAFT_ANOMALY_DATA.map((anomaly) => (
                <div key={anomaly.anomalyId} className="bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                    <div
                        className="p-4 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleExpand(anomaly.anomalyId)}
                    >
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${getSystemColor(anomaly.suspectedSystem)}`}></span>
                                {anomaly.description}
                            </h2>
                            <p className="text-gray-400">{t('suspected_system')}: {anomaly.suspectedSystem}</p>
                        </div>
                        <Icon name={expandedAnomalyId === anomaly.anomalyId ? "ChevronUp" : "ChevronDown"} className="w-6 h-6 text-gray-400" />
                    </div>

                    {expandedAnomalyId === anomaly.anomalyId && (
                        <div className="p-4 border-t border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-300">{t('potential_impact')}</h3>
                                    <p className="text-gray-400">{anomaly.potentialImpact}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-300">{t('fleet_prevalence')}</h3>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${anomaly.fleetPrevalence * 100}%` }}></div>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">{(anomaly.fleetPrevalence * 100).toFixed(0)}% {t('of_fleet_showing_precursors')}</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">{t('tail_number')}</th>
                                            <th scope="col" className="px-6 py-3">{t('first_occurrence')}</th>
                                            <th scope="col" className="px-6 py-3">{t('related_faults')}</th>
                                            <th scope="col" className="px-6 py-3">{t('key_sensor_readings')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {anomaly.affectedAircraft.map((aircraft) => (
                                            <tr key={aircraft.tailNumber} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                                                <td className="px-6 py-4 font-medium text-white">{aircraft.tailNumber}</td>
                                                <td className="px-6 py-4">{aircraft.firstOccurrence}</td>
                                                <td className="px-6 py-4">
                                                    {aircraft.relatedFaults.length > 0 ? aircraft.relatedFaults.join(', ') : 'None'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {Object.entries(aircraft.sensorReadings).map(([sensor, reading]) => (
                                                        <div key={sensor}>
                                                            <strong>{sensor}:</strong> {reading}
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CrossAircraftAnomalyCorrelation;