import React from 'react';
import { AVAILABLE_TILES } from '../constants';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';
import { TileType } from '../types';

const ManualSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">{title}</h2>
        <div className="p-6">{children}</div>
    </div>
);

const Step: React.FC<{ icon: string; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center">
            <Icon name={icon} className="w-5 h-5 text-sky-600 dark:text-sky-400" />
        </div>
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);

const TileGlossaryItem: React.FC<{ name: string; description: string }> = ({ name, description }) => (
     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-white">{name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const tileI18nMap: Record<TileType, string> = {
    'metric': 'manual_tile_metric_desc',
    'gauge': 'manual_tile_gauge_desc',
    'faults_by_system': 'manual_tile_faults_by_system_desc',
    'shi_trend': 'manual_tile_shi_trend_desc',
    'aircraft_list': 'manual_tile_aircraft_list_desc',
    'ai_summary': 'manual_tile_ai_summary_desc',
    'maintenance_list': 'manual_tile_maintenance_list_desc',
    'engine_vibration': 'manual_tile_engine_vibration_desc',
    'bar_chart': 'manual_tile_metric_desc', // Placeholder, but valid
    'line_chart': 'manual_tile_metric_desc', // Placeholder, but valid
    'area_chart': 'manual_tile_metric_desc', // Placeholder, but valid
    'pie_chart': 'manual_tile_metric_desc', // Placeholder, but valid
    'radar_chart': 'manual_tile_radar_chart_desc',
    'airframe_stress_chart': 'manual_tile_airframe_stress_chart_desc',
    'heatmap': 'manual_tile_heatmap_desc',
    'model_3d': 'manual_tile_model_3d_desc',
    'pilot_fatigue_trend': 'manual_tile_pilot_fatigue_trend_desc'
};

const DashboardManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="BookOpen" className="w-10 h-10" />
                {t('manual_dashboard_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_dashboard_subtitle')}
            </p>

            <ManualSection title={t('manual_section_management')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Step icon="LayoutGrid" title={t('manual_management_navigate')} description="" />
                    <Step icon="Plus" title={t('manual_management_create')} description="" />
                    <Step icon="Edit3" title={t('manual_management_rename')} description="" />
                    <Step icon="Trash2" title={t('manual_management_delete')} description="" />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_layout')}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Step icon="Layout" title={t('manual_layout_edit_mode')} description="" />
                    <Step icon="Plus" title={t('manual_layout_add_tile')} description="" />
                    <Step icon="X" title={t('manual_layout_remove_tile')} description="" />
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_tiles')}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AVAILABLE_TILES.map(tile => (
                        <TileGlossaryItem 
                            key={tile.type}
                            name={tile.name}
                            description={t(tileI18nMap[tile.type] as any)}
                        />
                    ))}
                </div>
            </ManualSection>

        </div>
    );
};

export default DashboardManualPage;