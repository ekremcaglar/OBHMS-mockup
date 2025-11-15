import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { MOCK_FLEET_DATA, CROSS_AIRCRAFT_TREND_DATA } from '../../constants';
import { useI18n } from '../../context/I18nContext';

const CrossAircraftTrendComparison: React.FC = () => {
    const { t } = useI18n();

    const { comparisonData: initialComparisonData } = CROSS_AIRCRAFT_TREND_DATA;

    // Calculate fleet average degradation rate
    const degradedSystems = MOCK_FLEET_DATA.aircraft.flatMap(ac => ac.systems.filter(s => s.status !== 'nominal'));
    const totalDegradation = degradedSystems.reduce((sum, sys) => sum + (100 - sys.healthIndex), 0);
    const fleetAverageDegradation = degradedSystems.length > 0 ? (totalDegradation / degradedSystems.length) / 10 : 0;

    // Calculate healthy fleet average for the radar chart
    const healthyAircraft = MOCK_FLEET_DATA.aircraft.filter(ac => ac.status === 'nominal');
    const healthyAverages: { [key: string]: number } = {};
    initialComparisonData.forEach(dataPoint => {
        let total = 0;
        let count = 0;
        healthyAircraft.forEach(ac => {
            const system = ac.systems.find(s => s.name === dataPoint.subject);
            if (system) {
                total += system.healthIndex;
                count++;
            }
        });
        healthyAverages[dataPoint.subject] = count > 0 ? total / count : 0;
    });

    const healthyAvgData = initialComparisonData.map(dataPoint => ({
        ...dataPoint,
        'Healthy Avg.': healthyAverages[dataPoint.subject] || 0,
    }));

    return (
        <div className="bg-[#101827] text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t('cross_aircraft_trend_comparison')}</h2>
            <p className="text-gray-400 mb-6">{t('cross_aircraft_trend_comparison_desc')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1a243d] p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{t('system_health_radar')}</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthyAvgData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="KAAN-001" dataKey="KAAN-001" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="KAAN-002" dataKey="KAAN-002" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Radar name="KAAN-003" dataKey="KAAN-003" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                            <Radar name="KAAN-004" dataKey="KAAN-004" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
                            <Radar name="Healthy Avg." dataKey="Healthy Avg." stroke="#d0ed57" fill="#d0ed57" fillOpacity={0.7} />
                            <Legend />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#1a243d] p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{t('degradation_rate_table')}</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('aircraft')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('system')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('degradation_rate')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{t('fleet_average')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {MOCK_FLEET_DATA.aircraft.map(ac =>
                                    ac.systems.filter(s => s.status !== 'nominal').map(sys => (
                                        <tr key={`${ac.id}-${sys.id}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">{ac.tailNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{sys.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sys.healthIndex < 80 ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                                    -{(100 - sys.healthIndex) / 10}% / {t('month')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">-{fleetAverageDegradation.toFixed(1)}% / {t('month')}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrossAircraftTrendComparison;