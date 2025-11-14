import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_DATA_SOURCES, MOCK_CHART_DATA } from '../../constants';
import FormSelect from '../forms/FormSelect';
import { useI18n } from '../../context/I18nContext';

const FeatureEngineeringAnalysis: React.FC = () => {
    const { t } = useI18n();
    const [dataSourceId, setDataSourceId] = useState<string | null>('feature-engineering-data');
    const [xAxisField, setXAxisField] = useState<string | null>('vibrationRms');
    const [yAxisField, setYAxisField] = useState<string | null>('peakToPeak');
    const [zAxisField, setZAxisField] = useState<string | null>('kurtosis');

    const featureDataSources = useMemo(() =>
        CHART_DATA_SOURCES.filter(ds => ds.id.includes('feature-engineering'))
    , []);

    const selectedDataSource = useMemo(() =>
        CHART_DATA_SOURCES.find(ds => ds.id === dataSourceId)
    , [dataSourceId]);

    const chartData = useMemo(() =>
        dataSourceId ? MOCK_CHART_DATA[dataSourceId] : []
    , [dataSourceId]);

    const handleDataSourceChange = (id: string) => {
        setDataSourceId(id);
        const newDataSource = CHART_DATA_SOURCES.find(ds => ds.id === id);
        if (newDataSource) {
            setXAxisField(newDataSource.fields.find(f => f.type === 'value')?.id || null);
            setYAxisField(newDataSource.fields.filter(f => f.type === 'value')[1]?.id || null);
            setZAxisField(newDataSource.fields.filter(f => f.type === 'value')[2]?.id || null);
        }
    };

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
                        {featureDataSources.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
                    </FormSelect>

                    {selectedDataSource && (
                        <>
                            <FormSelect label={t('x_axis_field')} value={xAxisField || ''} onChange={e => setXAxisField(e.target.value)}>
                                <option value="" disabled>{t('select_field')}</option>
                                {selectedDataSource.fields.filter(f => f.type === 'value').map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </FormSelect>
                            <FormSelect label={t('y_axis_fields')} value={yAxisField || ''} onChange={e => setYAxisField(e.target.value)}>
                                <option value="" disabled>{t('select_field')}</option>
                                {selectedDataSource.fields.filter(f => f.type === 'value').map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </FormSelect>
                             <FormSelect label="Z-Axis (Size)" value={zAxisField || ''} onChange={e => setZAxisField(e.target.value)}>
                                <option value="" disabled>{t('select_field')}</option>
                                {selectedDataSource.fields.filter(f => f.type === 'value').map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </FormSelect>
                        </>
                    )}
                </div>
            </aside>

            {/* Chart Area */}
            <main className="lg:col-span-9 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm p-6 flex flex-col">
                {chartData.length > 0 && xAxisField && yAxisField && zAxisField ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid stroke={gridColor} />
                            <XAxis type="number" dataKey={xAxisField} name={selectedDataSource?.fields.find(f=>f.id === xAxisField)?.name} stroke={tickColor} />
                            <YAxis type="number" dataKey={yAxisField} name={selectedDataSource?.fields.find(f=>f.id === yAxisField)?.name} stroke={tickColor} />
                            <ZAxis type="number" dataKey={zAxisField} name={selectedDataSource?.fields.find(f=>f.id === zAxisField)?.name} range={[60, 400]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltipStyle} />
                            <Legend />
                            <Scatter name="Engine Features" data={chartData} fill="#8884d8" />
                        </ScatterChart>
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

export default FeatureEngineeringAnalysis;