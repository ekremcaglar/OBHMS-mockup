import React from 'react';
import Card from '@/components/Card';
import Heatmap from '../charts/Heatmap';
import { HEATMAP_DATA } from '../../constants';
import { useI18n } from '../../context/I18nContext';

const InterParameterCorrelationAnalysis: React.FC = () => {
    const { t } = useI18n();
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {t('engine_param_correlation')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('engine_param_correlation_desc')}
        </p>
        <div style={{ height: '400px' }}>
            <Heatmap data={HEATMAP_DATA.data} labels={HEATMAP_DATA.labels} />
        </div>
      </Card>
    </div>
  );
};

export default InterParameterCorrelationAnalysis;