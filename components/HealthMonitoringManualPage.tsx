import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const ManualSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">{title}</h2>
        <div className="p-6">{children}</div>
    </div>
);

const FeatureDetail: React.FC<{ title: string; description: string }> = ({ title, description }) => (
     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const HealthMonitoringManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="Stethoscope" className="w-10 h-10" />
                {t('manual_health_monitoring_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_health_monitoring_subtitle')}
            </p>

            <ManualSection title={t('manual_section_structural_health')}>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t('manual_structural_health_desc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureDetail title={t('manual_structural_feature_1_title')} description={t('manual_structural_feature_1_desc')} />
                    <FeatureDetail title={t('manual_structural_feature_2_title')} description={t('manual_structural_feature_2_desc')} />
                    <FeatureDetail title={t('manual_structural_feature_3_title')} description={t('manual_structural_feature_3_desc')} />
                    <FeatureDetail title={t('manual_structural_feature_4_title')} description={t('manual_structural_feature_4_desc')} />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_engine_health')}>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t('manual_engine_health_desc')}</p>
                <div className="space-y-4">
                    <FeatureDetail title={t('manual_engine_feature_1_title')} description={t('manual_engine_feature_1_desc')} />
                    <FeatureDetail title={t('manual_engine_feature_2_title')} description={t('manual_engine_feature_2_desc')} />
                    <FeatureDetail title={t('manual_engine_feature_3_title')} description={t('manual_engine_feature_3_desc')} />
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_pilot_health')}>
                 <p className="text-gray-600 dark:text-gray-400 mb-6">{t('manual_pilot_health_desc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureDetail title={t('manual_pilot_feature_1_title')} description={t('manual_pilot_feature_1_desc')} />
                    <FeatureDetail title={t('manual_pilot_feature_2_title')} description={t('manual_pilot_feature_2_desc')} />
                    <FeatureDetail title={t('manual_pilot_feature_3_title')} description={t('manual_pilot_feature_3_desc')} />
                    <FeatureDetail title={t('manual_pilot_feature_4_title')} description={t('manual_pilot_feature_4_desc')} />
                </div>
            </ManualSection>
        </div>
    );
};

export default HealthMonitoringManualPage;