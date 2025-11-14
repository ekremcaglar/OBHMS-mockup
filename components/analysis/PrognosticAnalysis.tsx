import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { MOCK_PROGNOSTIC_DATA } from './mockPrognosticData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../Icon';

const PrognosticAnalysis: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="Clock" className="w-6 h-6" />
          {t('rul_predictions')}
        </h2>
        <div className="bg-[#1a202c] p-4 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-[#2d3748]">
                <tr>
                  <th scope="col" className="px-6 py-3">{t('component')}</th>
                  <th scope="col" className="px-6 py-3">{t('aircraft')}</th>
                  <th scope="col" className="px-6 py-3">{t('rul')}</th>
                  <th scope="col" className="px-6 py-3">{t('confidence')}</th>
                  <th scope="col" className="px-6 py-3">{t('primary_driver')}</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PROGNOSTIC_DATA.componentPredictions.map((pred) => (
                  <tr key={pred.id} className="bg-[#1a202c] border-b border-gray-700 hover:bg-[#2d3748]">
                    <td className="px-6 py-4">{pred.componentName}</td>
                    <td className="px-6 py-4">{pred.aircraft}</td>
                    <td className="px-6 py-4 font-bold text-orange-400">{pred.rul}</td>
                    <td className="px-6 py-4">{pred.confidence}</td>
                    <td className="px-6 py-4">{pred.primaryDriver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="TrendingDown" className="w-6 h-6" />
          {t('degradation_trends')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_PROGNOSTIC_DATA.degradationTrends.map((trend) => (
            <div key={trend.componentName} className="bg-[#1a202c] p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">{trend.componentName}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trend.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="time" stroke="#a0aec0" />
                  <YAxis label={{ value: t('health'), angle: -90, position: 'insideLeft', fill: '#a0aec0' }} stroke="#a0aec0" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#2d3748', border: 'none' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                  <Line type="monotone" dataKey="health" stroke="#f6ad55" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrognosticAnalysis;