import React from 'react';
import { useI18n } from '../context/I18nContext';
import Icon from './Icon';

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

const WorkflowItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
     <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-4">
        <Icon name={icon} className="w-6 h-6 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-1" />
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);


const TCPManualPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="FileCheck2" className="w-10 h-10" />
                {t('manual_tcp_title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                {t('manual_tcp_subtitle')}
            </p>

            <ManualSection title={t('manual_section_tcp_overview')}>
                <p className="text-gray-600 dark:text-gray-400">{t('manual_tcp_overview_desc')}</p>
            </ManualSection>

            <ManualSection title={t('manual_section_tcp_viewing')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Step icon="Search" title={t('manual_tcp_viewing_search_title')} description={t('manual_tcp_viewing_search_desc')} />
                    <Step icon="ArrowLeft" title={t('manual_tcp_viewing_pagination_title')} description={t('manual_tcp_viewing_pagination_desc')} />
                </div>
            </ManualSection>

            <ManualSection title={t('manual_section_tcp_creating')}>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t('manual_tcp_creating_desc')}</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Step icon="Plus" title={t('manual_tcp_creating_step1_title')} description={t('manual_tcp_creating_step1_desc')} />
                    <Step icon="Edit3" title={t('manual_tcp_creating_step2_title')} description={t('manual_tcp_creating_step2_desc')} />
                    <Step icon="Save" title={t('manual_tcp_creating_step3_title')} description={t('manual_tcp_creating_step3_desc')} />
                </div>
            </ManualSection>
            
            <ManualSection title={t('manual_section_tcp_workflow')}>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{t('manual_tcp_workflow_desc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WorkflowItem icon="Edit3" title={t('manual_workflow_draft_title')} description={t('manual_workflow_draft_desc')} />
                    <WorkflowItem icon="Info" title={t('manual_workflow_in_review_title')} description={t('manual_workflow_in_review_desc')} />
                    <WorkflowItem icon="CheckCircle" title={t('manual_workflow_approved_title')} description={t('manual_workflow_approved_desc')} />
                    <WorkflowItem icon="X" title={t('manual_workflow_rejected_title')} description={t('manual_workflow_rejected_desc')} />
                </div>
            </ManualSection>
        </div>
    );
};

export default TCPManualPage;