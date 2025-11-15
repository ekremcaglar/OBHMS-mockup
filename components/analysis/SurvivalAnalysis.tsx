import React from 'react';
import Icon from '../Icon';
import { useI18n } from '../../context/I18nContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockSurvivalData = [
    { name: 'Component A', time: 100, status: 'Failed' },
    { name: 'Component B', time: 150, status: 'Failed' },
    { name: 'Component C', time: 200, status: 'Running' },
    { name: 'Component D', time: 250, status: 'Failed' },
    { name: 'Component E', time: 300, status: 'Running' },
];

const mockChartData = [
    { time: 50, probability: 0.9 },
    { time: 100, probability: 0.8 },
    { time: 150, probability: 0.6 },
    { time: 200, probability: 0.4 },
    { time: 250, probability: 0.2 },
    { time: 300, probability: 0.1 },
];

const SurvivalAnalysis: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-8 shadow-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Icon name="LayoutGrid" className="w-8 h-8" />
                {t('survival_analysis')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{t('survival_analysis_desc')}</p>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('survival_probability_over_time')}</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="probability" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('component_status')}</h2>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('component')}</th>
                            <th scope="col" className="px-6 py-3">{t('time_to_event')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockSurvivalData.map((item) => (
                            <tr key={item.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">{item.time}</td>
                                <td className="px-6 py-4">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurvivalAnalysis;