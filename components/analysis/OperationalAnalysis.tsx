import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_FLEET_DATA } from '../../constants';
import { useI18n } from '../../context/I18nContext';
import Icon from '../Icon';

const OperationalAnalysis: React.FC = () => {
    const { t } = useI18n();

    const dataByMissionType = MOCK_FLEET_DATA.aircraft.reduce((acc, aircraft) => {
        const missionType = t(aircraft.missionType.replace(/\s/g, '_').toLowerCase());
        if (!acc[missionType]) {
            acc[missionType] = { name: missionType, aircraftCount: 0, totalFlightHours: 0, criticalSystems: 0 };
        }
        acc[missionType].aircraftCount++;
        acc[missionType].totalFlightHours += aircraft.flightHours;
        acc[missionType].criticalSystems += aircraft.systems.filter(s => s.status === 'critical').length;
        return acc;
    }, {} as { [key: string]: { name: string; aircraftCount: number; totalFlightHours: number; criticalSystems: number } });

    const chartData = Object.values(dataByMissionType);

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Icon name="Activity" className="mr-2" />
                    {t('component_health_by_mission_type')}
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barCategoryGap={ "20%" }
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis yAxisId="left" stroke="#A0AEC0" />
                        <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2D3748', border: 'none', color: 'white' }}
                            formatter={(value, name) => [value, t(name as any)]}
                        />
                        <Legend formatter={(value) => t(value as any)} />
                        <Bar yAxisId="left" dataKey="totalFlightHours" fill="#4299E1" name="total_flight_hours" />
                        <Bar yAxisId="right" dataKey="criticalSystems" fill="#F56565" name="critical_systems_count" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OperationalAnalysis;