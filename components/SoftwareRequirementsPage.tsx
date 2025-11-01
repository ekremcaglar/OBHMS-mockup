import React from 'react';
import { REQUIREMENTS_DATA } from '../constants';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

const RequirementSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">{title}</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
);

const RequirementCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
    </div>
);

const SoftwareRequirementsPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="ClipboardList" className="w-10 h-10" />
                {t('srs_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('srs_subtitle')}
            </p>

            {REQUIREMENTS_DATA.map(pillar => (
                <RequirementSection key={pillar.pillarKey} title={t(pillar.pillarKey as any)}>
                    {pillar.sections.map(req => (
                        <RequirementCard
                            key={req.key}
                            title={t(req.titleKey as any)}
                            description={t(req.descriptionKey as any)}
                        />
                    ))}
                </RequirementSection>
            ))}
        </div>
    );
};

export default SoftwareRequirementsPage;
