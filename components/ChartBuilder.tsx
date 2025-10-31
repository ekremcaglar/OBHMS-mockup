import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { FAULTS_BY_SYSTEM, SHI_TREND_DATA } from '../constants';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const dataSources = {
  faults: { name: 'Faults by System', data: FAULTS_BY_SYSTEM },
  shi: { name: 'SHI Trend', data: SHI_TREND_DATA },
};

const ChartBuilder: React.FC = () => {
  const [chartType, setChartType] = useState('bar');
  const [dataSourceKey, setDataSourceKey] = useState('faults');
  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKey, setYAxisKey] = useState('');
  const [generatedChart, setGeneratedChart] = useState<any>(null);

  const currentData = dataSources[dataSourceKey as keyof typeof dataSources].data;
  const dataKeys = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  useEffect(() => {
    const defaultKeys = dataSources[dataSourceKey as keyof typeof dataSources].data.length > 0 ? Object.keys(dataSources[dataSourceKey as keyof typeof dataSources].data[0]) : [];
    setXAxisKey(defaultKeys[0] || '');
    setYAxisKey(defaultKeys[1] || '');
    setGeneratedChart(null); // Reset chart on data source change
  }, [dataSourceKey]);

  const handleGenerateChart = () => {
    setGeneratedChart({
      type: chartType,
      data: currentData,
      xKey: xAxisKey,
      yKey: yAxisKey,
      fill: '#3b82f6', // Example color
    });
  };
  
  const renderGeneratedChart = () => {
    if (!generatedChart) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Icon name="BarChart3" className="w-24 h-24 mb-4" />
          <h3 className="text-xl font-semibold">Chart Preview</h3>
          <p>Configure your chart options and click "Generate Chart".</p>
        </div>
      );
    }

    const { type, data, xKey, yKey, fill } = generatedChart;

    const ChartTooltip = () => (
      <Tooltip
        cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
        contentStyle={{
          background: '#1f2937',
          borderColor: '#374151',
          borderRadius: '0.5rem',
        }}
      />
    );

    return (
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={xKey} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <ChartTooltip />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar dataKey={yKey} name={yKey.charAt(0).toUpperCase() + yKey.slice(1)} fill={fill} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={xKey} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={['auto', 'auto']} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <ChartTooltip />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Line type="monotone" dataKey={yKey} name={yKey.charAt(0).toUpperCase() + yKey.slice(1)} stroke={fill} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    );
  };
  
  const FormSelect: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode}> = ({label, value, onChange, children}) => (
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
            {children}
        </select>
      </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
      <div className="lg:col-span-1 bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-6">Chart Builder</h2>
        <div className="space-y-6 flex-grow">
          <FormSelect label="Chart Type" value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </FormSelect>
          <FormSelect label="Data Source" value={dataSourceKey} onChange={(e) => setDataSourceKey(e.target.value)}>
            {Object.entries(dataSources).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </FormSelect>
           <FormSelect label="X-Axis" value={xAxisKey} onChange={(e) => setXAxisKey(e.target.value)}>
            {dataKeys.map(key => <option key={key} value={key}>{key}</option>)}
          </FormSelect>
           <FormSelect label="Y-Axis" value={yAxisKey} onChange={(e) => setYAxisKey(e.target.value)}>
            {dataKeys.map(key => <option key={key} value={key}>{key}</option>)}
          </FormSelect>
        </div>
        <button onClick={handleGenerateChart} className="w-full flex items-center justify-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            <Icon name="BarChart3" className="w-5 h-5" />
            <span>Generate Chart</span>
        </button>
      </div>
      <div className="lg:col-span-3 bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          {renderGeneratedChart()}
      </div>
    </div>
  );
};

export default ChartBuilder;
