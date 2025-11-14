import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CHART_DATA_SOURCES, MOCK_CHART_DATA } from '../../constants';
import FormSelect from '../forms/FormSelect';
import { useI18n } from '../../context/I18nContext';

const TransientSignatureAnalysis: React.FC = () => {
    const { t } = useI18n();
    const [dataSourceId, setDataSourceId] = useState<string | null>('transient-event-data');

    const transientDataSources = useMemo(() =>
        CHART_DATA_SOURCES.filter(ds => ds.id.includes('transient'))
    , []);

    const selectedDataSource = useMemo(() =>
        CHART_DATA_SOURCES.find(ds => ds.id === dataSourceId)
    , [dataSourceId]);

    const chartData = useMemo(() =>
        dataSourceId ? MOCK_CHART_DATA[dataSourceId] : []
    , [dataSourceId]);

    const handleDataSourceChange = (id: string) => {
        setDataSourceId(id);
    }

    const COLORS = ['#ff8042'];
    const tickColor = document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280';
    const gridColor = document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb';
    const tooltipStyle = {
        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
        borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        borderRadius: '0.5rem',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-14rem)]">
            {/* Controls Panel */}
            <aside className="lg:col-span-3 bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-6 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">{t('select_parameters')}</h2>
                <div className="space-y-6">
                    <FormSelect label={t('data_source')} value={dataSourceId || ''} onChange={e => handleDataSourceChange(e.target.value)}>
                        <option value="" disabled>{t('select_source')}</option>
                        {transientDataSources.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
                    </FormSelect>
                     <div className="text-sm text-gray-500 dark:text-gray-400">
                        This analysis focuses on short-duration, high-energy events. The chart displays the signature of a selected transient event against a nominal baseline.
                    </div>
                </div>
            </aside>

            {/* Chart Area */}
            <main className="lg:col-span-9 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm p-6 flex flex-col">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} stroke={tickColor} fontSize={12} label={{ value: "Time (ms)", position: 'insideBottom', offset: -5 }} />
                            <YAxis stroke={tickColor} fontSize={12} label={{ value: "Amplitude", angle: -90, position: 'insideLeft' }}/>
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            <ReferenceLine y={2.5} label="Threshold" stroke="red" strokeDasharray="3 3" />
                            <Line
                                type="monotone"
                                dataKey="amplitude"
                                stroke={COLORS[0]}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                                name="Event Signature"
                            />
                             <Line
                                type="monotone"
                                dataKey="baseline"
                                stroke="#82ca9d"
                                strokeWidth={1}
                                strokeDasharray="5 5"
                                dot={false}
                                name="Nominal Baseline"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-center">
                        <p>{t('no_data_select_params')}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TransientSignatureAnalysis;