
import React from 'react';
import Icon from './Icon';
import MetricCard from './MetricCard';
import { METRICS_MAP, OPERATIONAL_FORECAST_DATA } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FleetAvailabilityGauge } from './charts/FleetAvailabilityGauge';

const PredictiveAnalytics: React.FC<{ title: string; description: string }> = ({ title, description }) => {
    const rulMetric = METRICS_MAP.get('rul-forecast');
    const missionSuccessMetric = METRICS_MAP.get('mission-success-likelihood');

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                    <Icon name="BarChart" className="w-8 h-8" />
                    {title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rulMetric && <MetricCard metric={rulMetric} />}
                {missionSuccessMetric && (
                    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{missionSuccessMetric.title}</h3>
                        <div className="h-64">
                            <FleetAvailabilityGauge value={parseFloat(missionSuccessMetric.value)} />
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Operational Parameter Forecasts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
                    <ResponsiveContainer>
                        <AreaChart data={OPERATIONAL_FORECAST_DATA['engine-temp']} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="upperBound" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="lowerBound" stroke="#ffc658" fill="#ffc658" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer>
                        <AreaChart data={OPERATIONAL_FORECAST_DATA['hydraulic-pressure']} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="forecast" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="upperBound" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="lowerBound" stroke="#ffc658" fill="#ffc658" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PredictiveAnalytics;
