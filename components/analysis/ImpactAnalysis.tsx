import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { MOCK_IMPACT_ANALYSIS_DATA } from '../../constants';
import { useI18n } from '../../context/I18nContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../Icon';

const ProgressBar: React.FC<{ current: number; projected: number; fullMark: number; label: string }> = ({ current, projected, fullMark, label }) => {
    const currentValue = Number(current);
    const projectedValue = Number(projected);

    const currentPercentage = (currentValue / fullMark) * 100;
    const projectedPercentage = (projectedValue / fullMark) * 100;

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm text-gray-300">
                <span>{label}</span>
                <span>{`${projectedValue.toFixed(0)} / ${fullMark}`}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
                <div
                    className="bg-sky-500 h-4 rounded-full"
                    style={{ width: `${projectedPercentage}%` }}
                />
                <div
                    className="absolute top-0 left-0 bg-sky-700 h-4 rounded-full"
                    style={{ width: `${currentPercentage}%`, zIndex: 1 }}
                />
            </div>
        </div>
    );
};

const SummaryMetric: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const SafetyRiskFactor: React.FC<{ factor: { name: string; status: 'critical' | 'warning' | 'nominal' } }> = ({ factor }) => {
    const statusConfig = {
        critical: { icon: 'ShieldX', color: 'text-red-400', label: 'critical' },
        warning: { icon: 'ShieldAlert', color: 'text-yellow-400', label: 'warning' },
        nominal: { icon: 'ShieldCheck', color: 'text-green-400', label: 'nominal' },
    };
    const { icon, color, label } = statusConfig[factor.status];
    const { t } = useI18n();

    return (
        <div className="flex items-center space-x-3">
            <Icon name={icon as any} className={`w-6 h-6 ${color}`} />
            <div>
                <p className="text-white font-medium">{t(factor.name as any)}</p>
                <p className={`text-sm ${color}`}>{t(label)}</p>
            </div>
        </div>
    );
};


interface ImpactAnalysisProps {
    title: string;
    description: string;
}

const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({ title, description }) => {
    const { t } = useI18n();
    const { missionCapability, costSchedule, safetyRisk } = MOCK_IMPACT_ANALYSIS_DATA;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-gray-400 mt-1">{description}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('mission_capability')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {missionCapability.data.map(item => (
                            <ProgressBar
                                key={item.name}
                                label={t(item.name as any)}
                                current={item.current}
                                projected={item.projected}
                                fullMark={item.fullMark}
                            />
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('cost_schedule')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-around items-center h-full">
                           {costSchedule.summary.map(item => (
                                <SummaryMetric
                                    key={item.name}
                                    label={t(item.name as any)}
                                    value={item.value}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('safety_risk')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-48">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={safetyRisk.data}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={70}
                                            innerRadius={40}
                                        >
                                            {safetyRisk.data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name) => [`${value}%`, t(name.toLowerCase() as any)]}
                                            contentStyle={{
                                                backgroundColor: '#1f2937',
                                                borderColor: '#374151',
                                                color: '#d1d5db'
                                            }}
                                        />
                                        <Legend
                                            formatter={(value) => <span className="text-gray-300">{t(value.toLowerCase() as any)}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4">
                                {safetyRisk.factors.map(factor => (
                                    <SafetyRiskFactor key={factor.name} factor={factor} />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ImpactAnalysis;
