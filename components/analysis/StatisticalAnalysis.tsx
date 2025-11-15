import React, { useState, useMemo } from 'react';
import { MOCK_FLEET_DATA } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatisticalAnalysis: React.FC = () => {
    const [selectedSystem, setSelectedSystem] = useState('Propulsion');

    const systemData = useMemo(() => {
        return MOCK_FLEET_DATA.aircraft.map(ac => {
            const system = ac.systems.find(s => s.name === selectedSystem);
            return system ? system.healthIndex : null;
        }).filter(hi => hi !== null) as number[];
    }, [selectedSystem]);

    const stats = useMemo(() => {
        if (systemData.length === 0) return null;

        const sum = systemData.reduce((a, b) => a + b, 0);
        const mean = sum / systemData.length;
        const sorted = [...systemData].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];
        const stdDev = Math.sqrt(systemData.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / systemData.length);
        const min = Math.min(...systemData);
        const max = Math.max(...systemData);

        return { mean, median, stdDev, min, max };
    }, [systemData]);

    const histogramData = useMemo(() => {
        if (!stats) return [];

        const { min, max } = stats;
        const binCount = 5;
        const binWidth = (max - min) / binCount;
        const bins = Array.from({ length: binCount }, (_, i) => ({
            name: `${(min + i * binWidth).toFixed(0)}-${(min + (i + 1) * binWidth).toFixed(0)}`,
            count: 0,
        }));

        systemData.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
            if(bins[binIndex]) {
                bins[binIndex].count++;
            }
        });

        return bins;
    }, [systemData, stats]);

    const systemOptions = useMemo(() => {
        const systems = new Set<string>();
        MOCK_FLEET_DATA.aircraft.forEach(ac => {
            ac.systems.forEach(s => systems.add(s.name));
        });
        return Array.from(systems);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Statistical Analysis</h2>
                <div className="flex items-center gap-4">
                    <label htmlFor="system-select" className="text-sm font-medium text-gray-600 dark:text-gray-300">Select System:</label>
                    <select
                        id="system-select"
                        value={selectedSystem}
                        onChange={(e) => setSelectedSystem(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-1.5 px-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        {systemOptions.map(sys => <option key={sys} value={sys}>{sys}</option>)}
                    </select>
                </div>
            </div>

            {stats && (
                <div className="grid grid-cols-5 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mean</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.mean.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Median</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.median.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Std. Dev</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.stdDev.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Min</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.min.toFixed(2)}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Max</h4>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.max.toFixed(2)}</p>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-96">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Health Index Distribution for {selectedSystem}</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={histogramData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="#38bdf8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatisticalAnalysis;
