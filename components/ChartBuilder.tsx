import React, { useState, useMemo } from 'react';
import { ChartConfig } from '../types';
import { INITIAL_CHARTS, CHART_DATA_SOURCES, MOCK_CHART_DATA } from '../constants';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { 
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import FormSelect from './forms/FormSelect';
import { useI18n } from '../context/I18nContext';

const ChartBuilder: React.FC = () => {
    const [charts, setCharts] = useState<ChartConfig[]>(INITIAL_CHARTS);
    const [activeChartId, setActiveChartId] = useState<string | null>(INITIAL_CHARTS[0]?.id || null);
    const [editingChartId, setEditingChartId] = useState<string | null>(null);
    const [editingChartName, setEditingChartName] = useState('');
    const { t } = useI18n();
    
    const activeChart = useMemo(() => charts.find(c => c.id === activeChartId), [charts, activeChartId]);
    
    const [tempConfig, setTempConfig] = useState<ChartConfig | null>(activeChart || null);

    React.useEffect(() => {
        setTempConfig(activeChart || null);
    }, [activeChart]);

    const handleCreateChart = () => {
        const newId = `chart-${Date.now()}`;
        const newChart: ChartConfig = {
            id: newId,
            name: `${t('new_chart')} ${charts.length + 1}`,
            dataSourceId: null,
            chartType: 'bar',
            xAxisField: null,
            yAxisFields: [],
        };
        setCharts([...charts, newChart]);
        setActiveChartId(newId);
    };

    const handleDeleteChart = (id: string) => {
        const newCharts = charts.filter(c => c.id !== id);
        setCharts(newCharts);
        if (activeChartId === id) {
            const newActiveId = newCharts.length > 0 ? newCharts[0].id : null;
            setActiveChartId(newActiveId);
        }
    };

    const handleStartEdit = (chart: ChartConfig) => {
        setEditingChartId(chart.id);
        setEditingChartName(chart.name);
    };
    
    const handleSaveEdit = (id: string) => {
        setCharts(charts.map(c => (c.id === id ? { ...c, name: editingChartName } : c)));
        setEditingChartId(null);
    };

    const handleCancelEdit = () => {
        setEditingChartId(null);
    };

    const handleConfigChange = (field: keyof ChartConfig, value: any) => {
        if (!tempConfig) return;
        
        let newConfig = { ...tempConfig, [field]: value };
        
        if (field === 'dataSourceId') {
            newConfig.xAxisField = null;
            newConfig.yAxisFields = [];
        }
        
        setTempConfig(newConfig);
    };
    
    const handleSaveConfig = () => {
        if (!tempConfig) return;
        setCharts(charts.map(c => c.id === tempConfig.id ? tempConfig : c));
    };
    
    const handleYFieldToggle = (fieldId: string) => {
        if (!tempConfig) return;
        const newYFields = tempConfig.yAxisFields?.includes(fieldId)
            ? tempConfig.yAxisFields.filter(id => id !== fieldId)
            : [...(tempConfig.yAxisFields || []), fieldId];
        handleConfigChange('yAxisFields', newYFields);
    };


    const activeDataSource = CHART_DATA_SOURCES.find(ds => ds.id === tempConfig?.dataSourceId);
    const chartData = tempConfig?.dataSourceId ? MOCK_CHART_DATA[tempConfig.dataSourceId] : [];

    const renderChartPreview = () => {
        if (!tempConfig || !tempConfig.dataSourceId || !tempConfig.xAxisField || !tempConfig.yAxisFields || tempConfig.yAxisFields.length === 0) {
            return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-500">{t('configure_chart_to_see_preview')}</div>;
        }

        const commonProps = {
            data: chartData,
            margin: { top: 5, right: 20, left: 0, bottom: 5 },
        };
        
        const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];
        const tickColor = document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280';
        const gridColor = document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb';
        const tooltipStyle = {
            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
            borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
        };

        return (
            <ResponsiveContainer width="100%" height="100%">
                <>
                    {tempConfig.chartType === 'bar' && (
                        <BarChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey={tempConfig.xAxisField} stroke={tickColor} fontSize={12} />
                            <YAxis stroke={tickColor} fontSize={12} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            {tempConfig.yAxisFields.map((field, index) => (
                                <Bar key={field} dataKey={field} name={activeDataSource?.fields.find(f => f.id === field)?.name || field} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </BarChart>
                    )}
                    {tempConfig.chartType === 'line' && (
                        <LineChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey={tempConfig.xAxisField} stroke={tickColor} fontSize={12} />
                            <YAxis stroke={tickColor} fontSize={12} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            {tempConfig.yAxisFields.map((field, index) => (
                                <Line key={field} type="monotone" dataKey={field} name={activeDataSource?.fields.find(f => f.id === field)?.name || field} stroke={COLORS[index % COLORS.length]} />
                            ))}
                        </LineChart>
                    )}
                    {tempConfig.chartType === 'scatter' && (
                        <ScatterChart {...commonProps}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis type="category" dataKey={tempConfig.xAxisField} name={tempConfig.xAxisField} stroke={tickColor} fontSize={12} />
                            <YAxis type="number" dataKey={tempConfig.yAxisFields[0]} name={tempConfig.yAxisFields[0]} stroke={tickColor} fontSize={12} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltipStyle} />
                            <Legend />
                            {tempConfig.yAxisFields.map((field, index) => (
                               <Scatter key={field} name={field} dataKey={field} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </ScatterChart>
                    )}
                    {tempConfig.chartType === 'pie' && (
                        <PieChart>
                            <Pie data={chartData} dataKey={tempConfig.yAxisFields[0]} nameKey={tempConfig.xAxisField} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle}/>
                            <Legend />
                        </PieChart>
                    )}
                    {tempConfig.chartType === 'radar' && (
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                            <PolarGrid stroke={gridColor} />
                            <PolarAngleAxis dataKey={tempConfig.xAxisField} stroke={tickColor} fontSize={12} />
                            <PolarRadiusAxis />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            {tempConfig.yAxisFields.map((field, index) => (
                                <Radar key={field} name={field} dataKey={field} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} fillOpacity={0.6} />
                            ))}
                        </RadarChart>
                    )}
                </>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
            <aside className="lg:col-span-3 bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-4 flex flex-col">
                 <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4 px-2">{t('my_charts')}</h2>
                 <div className="flex-grow space-y-2 overflow-y-auto pr-2">
                    {charts.map(chart => (
                        <div key={chart.id} className={`group w-full text-left p-3 rounded-md transition-colors flex items-center justify-between ${activeChartId === chart.id ? 'bg-sky-600/20 dark:bg-cyan-600/50' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}>
                           {editingChartId === chart.id ? (
                                <input
                                    type="text"
                                    value={editingChartName}
                                    onChange={(e) => setEditingChartName(e.target.value)}
                                    className="bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-white w-full text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-sm px-1"
                                    autoFocus
                                />
                            ) : (
                                <button onClick={() => setActiveChartId(chart.id)} className="flex-grow text-left text-sm font-semibold text-gray-800 dark:text-white truncate">
                                    {chart.name}
                                </button>
                            )}
                             <div className="flex items-center space-x-1 flex-shrink-0">
                                {editingChartId === chart.id ? (
                                    <>
                                        <button onClick={() => handleSaveEdit(chart.id)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600"><Save className="w-4 h-4 text-green-500" /></button>
                                        <button onClick={handleCancelEdit} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600"><X className="w-4 h-4 text-gray-500" /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleStartEdit(chart)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100"><Edit3 className="w-4 h-4 text-yellow-500" /></button>
                                        <button onClick={() => handleDeleteChart(chart.id)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={handleCreateChart} className="w-full flex items-center justify-center space-x-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200">
                        <Plus className="w-4 h-4" />
                        <span>{t('new_chart')}</span>
                    </button>
                </div>
            </aside>

            <main className="lg:col-span-9 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm flex">
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-700/50 p-6 overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('chart_configuration')}</h2>
                    {tempConfig ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('chart_name')}</label>
                                <input
                                    type="text"
                                    value={tempConfig.name}
                                    onChange={(e) => handleConfigChange('name', e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>
                            <FormSelect label={t('chart_type')} value={tempConfig.chartType} onChange={e => handleConfigChange('chartType', e.target.value)}>
                                <option value="bar">Bar</option>
                                <option value="line">Line</option>
                                <option value="scatter">Scatter</option>
                                <option value="pie">Pie</option>
                                <option value="radar">Radar</option>
                            </FormSelect>
                            <FormSelect label={t('data_source')} value={tempConfig.dataSourceId || ''} onChange={e => handleConfigChange('dataSourceId', e.target.value)}>
                                <option value="" disabled>{t('select_source')}</option>
                                {CHART_DATA_SOURCES.map(ds => <option key={ds.id} value={ds.id}>{ds.name}</option>)}
                            </FormSelect>
                            {activeDataSource && (
                                <>
                                    <FormSelect label="X-Axis" value={tempConfig.xAxisField || ''} onChange={e => handleConfigChange('xAxisField', e.target.value)}>
                                        <option value="" disabled>{t('select_field')}</option>
                                        {activeDataSource.fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                    </FormSelect>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('y_axis_fields')}</label>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 rounded-md bg-gray-100 dark:bg-slate-700/50 p-3">
                                            {activeDataSource.fields.filter(f => f.type === 'value').map(field => (
                                                <label key={field.id} className="flex items-center space-x-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={tempConfig.yAxisFields?.includes(field.id) ?? false}
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
                            <button onClick={handleSaveConfig} className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                                <Save className="w-4 h-4" />
                                <span>{t('save_chart')}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                             <p>{t('select_or_create_chart')}</p>
                        </div>
                    )}
                </div>
                <div className="w-2/3 p-6">
                    {renderChartPreview()}
                </div>
            </main>
        </div>
    );
};

export default ChartBuilder;