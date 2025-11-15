import React from 'react';
import MetricCard from '../MetricCard';
import { STRUCTURAL_HEALTH_METRICS } from '../../constants';
import AirframeStressChart from '../health/charts/AirframeStressChart';
import Model3D from '../viewer/Model3D';
import StructuralHeatmap from '../health/charts/StructuralHeatmap';
import { useI18n } from '../../context/I18nContext';

const StructuralHealthManagementAnalysis: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-2">Structural Health Analysis Dashboard</h2>
        <p className="text-gray-400">
          This dashboard provides a comprehensive overview of the structural integrity of the aircraft.
          It combines real-time sensor data with predictive models to assess fatigue, stress, and potential failure points.
        </p>
      </div>
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

export default StructuralHealthManagementAnalysis;
