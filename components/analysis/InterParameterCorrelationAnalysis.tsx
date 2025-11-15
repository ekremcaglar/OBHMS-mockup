import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import Heatmap from '../charts/Heatmap';
import { HEATMAP_DATA } from '../../constants';
import { useI18n } from '../../context/I18nContext';

const InterParameterCorrelationAnalysis: React.FC = () => {
    const { t } = useI18n();
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('engine_param_correlation')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('engine_param_correlation_desc')}
          </p>
          <div style={{ height: '400px' }}>
              <Heatmap data={HEATMAP_DATA.data} labels={HEATMAP_DATA.labels} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterParameterCorrelationAnalysis;