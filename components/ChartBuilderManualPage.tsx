import React from 'react';
import { CHART_DATA_SOURCES } from '../constants';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';
import { DataSource } from '../types';

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

const GlossaryItem: React.FC<{ icon: string; name: string; description: string }> = ({ icon, name, description }) => (
     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-4">
        <Icon name={icon} className="w-6 h-6 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-1" />
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);

const dataSourceI18nMap: Record<string, string> = {
    'fault-data': 'manual_source_fault_data_desc',
    'engine-vibration': 'manual_source_engine_vibration_desc',
    'system-health-comparison': 'manual_source_system_health_desc'
};

const ChartBuilderManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="BarChartHorizontal" className="w-10 h-10" />
                {t('manual_chart_builder_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_chart_builder_subtitle')}
            </p>

            <ManualSection title={t('manual_section_chart_management')}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Step icon="Plus" title={t('manual_chart_create')} description={t('manual_chart_create_desc')} />
                    <Step icon="Edit3" title={t('manual_chart_rename')} description={t('manual_chart_rename_desc')} />
                    <Step icon="Trash2" title={t('manual_chart_delete')} description={t('manual_chart_delete_desc')} />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_chart_configuration')}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Step icon="BarChartHorizontal" title={t('manual_config_type')} description={t('manual_config_type_desc')} />
                    <Step icon="Database" title={t('manual_config_source')} description={t('manual_config_source_desc')} />
                    <Step icon="MoveHorizontal" title={t('manual_config_xaxis')} description={t('manual_config_xaxis_desc')} />
                    <Step icon="MoveVertical" title={t('manual_config_yaxis')} description={t('manual_config_yaxis_desc')} />
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_data_sources_glossary')}>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {CHART_DATA_SOURCES.map((ds: DataSource) => (
                        <GlossaryItem 
                            key={ds.id}
                            icon={ds.icon}
                            name={ds.name}
                            description={t(dataSourceI18nMap[ds.id] as any)}
                        />
                    ))}
                </div>
            </ManualSection>
        </div>
    );
};

export default ChartBuilderManualPage;