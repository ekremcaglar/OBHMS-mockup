import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../Icon';
import { MOCK_IMPACT_ANALYSIS_DATA } from '../../constants';

interface ImpactAnalysisProps {
    title: string;
}

const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({ title }) => {
    const { t } = useI18n();
    const data = MOCK_IMPACT_ANALYSIS_DATA;
    const tickColor = document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280';
    const gridColor = document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb';
    const tooltipStyle = {
        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        borderRadius: '0.5rem',
    };

    const StatusIndicator: React.FC<{ status: 'nominal' | 'warning' | 'critical' }> = ({ status }) => {
        const color = {
            nominal: 'bg-green-500',
            warning: 'bg-yellow-500',
            critical: 'bg-red-500',
        }[status];
        return <span className={`w-3 h-3 rounded-full ${color} inline-block mr-2`}></span>;
    };

    return (
        <div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Icon name="TrendingUp" className="w-8 h-8" />
                {title}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1: Mission Capability */}
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
                        <Icon name="Target" className="w-6 h-6" />
                        {t('mission_capability')}
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.missionCapability.data}>
                                <PolarGrid stroke={gridColor}/>
                                <PolarAngleAxis dataKey="name" stroke={tickColor}/>
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={tickColor} />
                                <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Radar name="Projected" dataKey="projected" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('key_metrics')}</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            {data.missionCapability.metrics.map(metric => (
                                 <li key={metric.name} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-slate-700/50">
                                    <span>{t(metric.name as any)}</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{metric.value}{metric.unit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Column 2: Cost / Schedule */}
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
                        <Icon name="DollarSign" className="w-6 h-6" />
                        {t('cost_schedule_impact')}
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.costSchedule.data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor}/>
                                <XAxis type="number" stroke={tickColor} />
                                <YAxis type="category" dataKey="name" stroke={tickColor} width={80} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d" name={t('cost_increase_percent')} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('impact_summary')}</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                           {data.costSchedule.summary.map(item => (
                                 <li key={item.name} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-slate-700/50">
                                    <span>{t(item.name as any)}</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Column 3: Safety / Risk */}
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
                        <Icon name="Shield" className="w-6 h-6" />
                        {t('safety_risk_assessment')}
                    </h2>
                    <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.safetyRisk.data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${t(name as any)} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {data.safetyRisk.data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('risk_factors')}</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            {data.safetyRisk.factors.map(factor => (
                                 <li key={factor.name} className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-slate-700/50">
                                    <StatusIndicator status={factor.status as any} />
                                    <span>{t(factor.name as any)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImpactAnalysis;