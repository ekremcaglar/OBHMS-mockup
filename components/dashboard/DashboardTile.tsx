import React from 'react';
import { Tile } from '../../types';
import { METRICS_MAP } from '../../constants';
import MetricCard from '../MetricCard';
import FleetAvailabilityGauge from '../charts/FleetAvailabilityGauge';
import AircraftList from './AircraftList';
import AiSummary from './AiSummary';
import FaultsBySystemChart from '../charts/FaultsBySystemChart';
import ShiTrendChart from '../charts/ShiTrendChart';
import MaintenanceWatchlist from '../MaintenanceWatchlist';
import EngineVibrationChart from '../charts/EngineVibrationChart';
import AirframeStressChart from '../health/charts/AirframeStressChart';
import RadarChart from '../charts/RadarChart';
import Heatmap from '../charts/Heatmap';
import Model3D from '../viewer/Model3D';
import { X } from 'lucide-react';
import { useI18n } from '../../context/I18nContext';
import PilotFatigueChart from '../charts/PilotFatigueChart';

interface DashboardTileProps {
    tile: Tile;
    onAircraftSelect: (id: string) => void;
    isEditMode: boolean;
    onRemove: () => void;
}

// A placeholder for generic chart types from Chart Builder
const GenericChart: React.FC<{tile: Tile}> = ({ tile }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">{tile.title || tile.type.replace('_', ' ')}</p>
        </div>
    );
}

const DashboardTile: React.FC<DashboardTileProps> = ({ tile, onAircraftSelect, isEditMode, onRemove }) => {
    const { t } = useI18n();
    const renderContent = () => {
        switch (tile.type) {
            case 'metric': {
                const metric = tile.metricId ? METRICS_MAP.get(tile.metricId) : undefined;
                return metric ? <MetricCard metric={metric} /> : <div className="text-red-400">Metric not found</div>;
            }
            case 'gauge': {
                 const metric = tile.metricId ? METRICS_MAP.get(tile.metricId) : undefined;
                 return metric ? <MetricCard metric={metric}><FleetAvailabilityGauge metric={metric} /></MetricCard> : <div className="text-red-400">Metric not found</div>;
            }
            case 'aircraft_list':
                return <AircraftList onAircraftSelect={onAircraftSelect} />;
            case 'ai_summary':
                return <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 shadow-lg backdrop-blur-sm h-full flex flex-col"><AiSummary /></div>;
            case 'faults_by_system':
                return <MetricCard metric={{id:'faults-chart', title: 'Faults by System', value: '', unit: '', status: 'nominal', description: 'Count of faults per system.'}}><FaultsBySystemChart /></MetricCard>;
            case 'shi_trend':
                 return <MetricCard metric={{id:'shi-chart', title: tile.title || 'Fleet SHI Trend', value: '', unit: '', status: 'nominal', description: 'System Health Index trend.'}}><ShiTrendChart /></MetricCard>;
            case 'maintenance_list':
                return <MaintenanceWatchlist />;
            case 'engine_vibration':
                return <MetricCard metric={{id:'engine-vibration', title: 'Engine Vibration Trend', value: '', unit: '', status: 'warning', description: 'Engine vibration data.'}}><EngineVibrationChart /></MetricCard>;
            case 'airframe_stress_chart':
                return <MetricCard metric={{id:'airframe-stress-chart', title: t('airframe_high_g'), value: '', unit: '', status: 'warning', description: t('airframe_high_g_desc')}}><AirframeStressChart /></MetricCard>;
            case 'radar_chart':
                return <MetricCard metric={{id:'radar-chart', title: t('system_health_comparison'), value: '', unit: '', status: 'nominal', description: t('system_health_comparison_desc')}}><RadarChart /></MetricCard>;
            case 'heatmap':
                return <MetricCard metric={{id:'heatmap-chart', title: t('engine_param_correlation'), value: '', unit: '', status: 'nominal', description: t('engine_param_correlation_desc')}}><Heatmap /></MetricCard>;
            case 'model_3d':
                return <MetricCard metric={{id:'model-3d', title: t('digital_twin_viewer'), value: '', unit: '', status: 'nominal', description: t('digital_twin_viewer_desc')}}><Model3D /></MetricCard>;
            case 'pilot_fatigue_trend':
                 return <MetricCard metric={{id:'pilot-fatigue-chart', title: 'Pilot Fatigue Trend', value: '', unit: '', status: 'nominal', description: 'Fatigue index over last 10 flights.'}}><PilotFatigueChart /></MetricCard>;
            case 'bar_chart':
            case 'line_chart':
            case 'area_chart':
            case 'pie_chart':
                return <MetricCard metric={{id: tile.id, title: tile.title || 'Chart', value: '', unit: '', status: 'nominal', description: ''}}><GenericChart tile={tile} /></MetricCard>;
            default:
                return <div className="text-yellow-400">Unknown tile type: {tile.type}</div>;
        }
    };
    
    const gridSpanClass = `col-span-12 md:col-span-6 lg:col-span-${tile.gridSpan}`;

    return (
        <div className={`${gridSpanClass} relative h-full`}>
            {isEditMode && (
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-red-600/80 hover:bg-red-500 rounded-full text-white"
                    aria-label="Remove tile"
                >
                    <X size={16} />
                </button>
            )}
            <div className="h-full">
              {renderContent()}
            </div>
        </div>
    );
};

export default DashboardTile;