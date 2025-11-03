import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const ManualSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">{title}</h2>
        <div className="p-6">{children}</div>
    </div>
);

const Detail: React.FC<{ title: string; description: string }> = ({ title, description }) => (
     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
);

const SoftwareArchitectureManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="Component" className="w-10 h-10" />
                {t('manual_architecture_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_architecture_subtitle')}
            </p>

            <ManualSection title={t('manual_section_high_level_arch')}>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('manual_high_level_arch_desc_1')}</p>
                <p className="text-gray-600 dark:text-gray-400">{t('manual_high_level_arch_desc_2')}</p>
            </ManualSection>

            <ManualSection title={t('manual_section_core_tech')}>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    <li>{t('manual_core_tech_react')}</li>
                    <li>{t('manual_core_tech_ts')}</li>
                    <li>{t('manual_core_tech_tailwind')}</li>
                    <li>{t('manual_core_tech_gemini')}</li>
                    <li>{t('manual_core_tech_recharts')}</li>
                    <li>{t('manual_core_tech_lucide')}</li>
                </ul>
            </ManualSection>

            <ManualSection title={t('manual_section_design_principles')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Detail title={t('manual_design_principle_1_title')} description={t('manual_design_principle_1_desc')} />
                    <Detail title={t('manual_design_principle_2_title')} description={t('manual_design_principle_2_desc')} />
                    <Detail title={t('manual_design_principle_3_title')} description={t('manual_design_principle_3_desc')} />
                    <Detail title={t('manual_design_principle_4_title')} description={t('manual_design_principle_4_desc')} />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_data_flow')}>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('manual_data_flow_desc')}</p>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    <li>{t('manual_data_flow_step_1')}</li>
                    <li>{t('manual_data_flow_step_2')}</li>
                    <li>{t('manual_data_flow_step_3')}</li>
                    <li>{t('manual_data_flow_step_4')}</li>
                </ol>
            </ManualSection>

            <ManualSection title={t('manual_section_project_structure')}>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('manual_project_structure_desc')}</p>
                 <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 font-mono text-sm">
                    <li>/src/<strong>components/</strong>: {t('manual_structure_components')}</li>
                    <li>/src/<strong>context/</strong>: {t('manual_structure_context')}</li>
                    <li>/src/<strong>locales/</strong>: {t('manual_structure_locales')}</li>
                    <li>/src/<strong>services/</strong>: {t('manual_structure_services')}</li>
                    <li>/src/<strong>types.ts</strong>: {t('manual_structure_types')}</li>
                    <li>/src/<strong>constants.ts</strong>: {t('manual_structure_constants')}</li>
                </ul>
            </ManualSection>
        </div>
    );
};

export default SoftwareArchitectureManualPage;