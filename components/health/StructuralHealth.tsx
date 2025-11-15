import React from 'react';
import MetricCard from '../MetricCard';
import { STRUCTURAL_HEALTH_METRICS } from '../../constants';
import AirframeStressChart from './charts/AirframeStressChart';
import Model3D from '../viewer/Model3D';
import StructuralHeatmap from './charts/StructuralHeatmap';
import { useI18n } from '../../context/I18nContext';

const StructuralHealth: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 h-[400px]">
           <MetricCard metric={{id:'model-3d', title: t('digital_twin_viewer'), value: '', unit: '', status: 'nominal', description: t('digital_twin_viewer_desc')}}>
            <Model3D />
           </MetricCard>
        </div>
        <div className="lg:col-span-2 space-y-4">
            <MetricCard metric={STRUCTURAL_HEALTH_METRICS.fuselageFatigue} />
            <MetricCard metric={STRUCTURAL_HEALTH_METRICS.wingStressCycles} />
            <MetricCard metric={STRUCTURAL_HEALTH_METRICS.landingGearIntegrity} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
        <MetricCard 
          metric={{ 
            id: 'af-stress', 
            title: t('airframe_high_g'), 
            value: '', 
            unit: '', 
            status: 'warning', 
            description: t('airframe_high_g_desc')
          }}
        >
          <AirframeStressChart />
        </MetricCard>
        <MetricCard 
          metric={{ 
            id: 'af-heatmap', 
            title: "Airframe Stress Heatmap", 
            value: '', 
            unit: '', 
            status: 'nominal', 
            description: "Distribution of stress types across key airframe sections."
          }}
        >
          <StructuralHeatmap />
        </MetricCard>
      </div>
    </div>
  );
};

export default StructuralHealth;