import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_DATA_SOURCES, MOCK_CHART_DATA } from '../../constants';
import FormSelect from '../forms/FormSelect';
import { useI18n } from '../../context/I18nContext';

const DataProcessingAnalysis: React.FC = () => {
    const { t } = useI18n();
    const [dataSourceId, setDataSourceId] = useState<string | null>('data-processing-pipeline');
    const [xAxisField, setXAxisField] = useState<string | null>('stage');
    const [yAxisFields, setYAxisFields] = useState<string[]>(['dataVolume']);

    const dataProcessingDataSources = useMemo(() =>
        CHART_DATA_SOURCES.filter(ds => ds.id.includes('data-processing'))
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
        const firstCatField = newDataSource?.fields.find(f => f.type === 'category');
        const firstValField = newDataSource?.fields.find(f => f.type === 'value');
        setXAxisField(firstCatField?.id || null);
        setYAxisFields(firstValField ? [firstValField.id] : []);
    }

    const handleYFieldToggle = (fieldId: string) => {
        setYAxisFields(prev =>
            prev.includes(fieldId)
                ? prev.filter(id => id !== fieldId)
                : [...prev, fieldId]
        );
    };

    const availableYFields = useMemo(() =>
        selectedDataSource?.fields.filter(f => f.type === 'value') || []
    , [selectedDataSource]);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];
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
                        {dataProcessingDataSources.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
                    </FormSelect>

                    {selectedDataSource && (
                        <>
                            <FormSelect label={t('x_axis_field')} value={xAxisField || ''} onChange={e => setXAxisField(e.target.value)}>
                                <option value="" disabled>{t('select_field')}</option>
                                {selectedDataSource.fields.filter(f => f.type === 'category').map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </FormSelect>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('y_axis_fields')}</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 rounded-md bg-gray-100 dark:bg-slate-700/50 p-3">
                                    {availableYFields.map(field => (
                                        <label key={field.id} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={yAxisFields.includes(field.id)}
                                                onChange={() => handleYFieldToggle(field.id)}
                                                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-sky-600 focus:ring-sky-500 bg-gray-200 dark:bg-slate-800"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{field.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </aside>

            {/* Chart Area */}
            <main className="lg:col-span-9 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm p-6 flex flex-col">
                {chartData.length > 0 && xAxisField && yAxisFields.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey={xAxisField} stroke={tickColor} fontSize={12} />
                            <YAxis stroke={tickColor} fontSize={12} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            {yAxisFields.map((field, index) => (
                                <Bar
                                    key={field}
                                    dataKey={field}
                                    fill={COLORS[index % COLORS.length]}
                                    name={availableYFields.find(f => f.id === field)?.name || field}
                                />
                            ))}
                        </BarChart>
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

export default DataProcessingAnalysis;