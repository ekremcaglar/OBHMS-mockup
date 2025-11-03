import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';
import { REPORT_TEMPLATES } from '../constants';
import { ReportTemplate } from '../types';

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

const GlossaryItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-4">
        <Icon name={icon} className="w-6 h-6 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-1" />
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);

const templateI18nMap: Record<string, { title: string, desc: string }> = {
    'rt-1': { title: 'manual_template_aircraft_health_title', desc: 'aircraft_health_summary_desc' },
    'rt-2': { title: 'manual_template_fleet_capability_title', desc: 'fleet_mission_capability_desc' },
    'rt-3': { title: 'manual_template_system_fault_title', desc: 'system_fault_analysis_desc' },
    'rt-4': { title: 'manual_template_rul_forecast_title', desc: 'component_rul_forecast_desc' },
    'rt-5': { title: 'manual_template_pilot_fatigue_title', desc: 'pilot_fatigue_report_desc' },
};

const ReportsManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="FilePieChart" className="w-10 h-10" />
                {t('manual_reports_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_reports_subtitle')}
            </p>

            <ManualSection title={t('manual_section_report_generation')}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Step icon="Plus" title={t('manual_reports_step_1_title')} description={t('manual_reports_step_1_desc')} />
                    <Step icon="FileText" title={t('manual_reports_step_2_title')} description={t('manual_reports_step_2_desc')} />
                    <Step icon="Settings" title={t('manual_reports_step_3_title')} description={t('manual_reports_step_3_desc')} />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_report_viewing')}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Step icon="Layout" title={t('manual_reports_viewing_desc')} description="" />
                    <Step icon="Printer" title={t('manual_reports_printing_desc')} description="" />
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_templates_glossary')}>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {REPORT_TEMPLATES.map((template: ReportTemplate) => {
                        const i18nKeys = templateI18nMap[template.id];
                        return (
                            <GlossaryItem 
                                key={template.id}
                                icon={template.icon}
                                title={t(i18nKeys.title as any)}
                                description={t(i18nKeys.desc as any)}
                            />
                        )
                    })}
                </div>
            </ManualSection>
        </div>
    );
};

export default ReportsManualPage;